package com.coderalexis.patitas.service;

import com.coderalexis.patitas.config.CitaConfig;
import com.coderalexis.patitas.exceptions.AppointmentNotAvailableException;
import com.coderalexis.patitas.exceptions.ResourceNotFoundException;
import com.coderalexis.patitas.mapper.CitaMapper;
import com.coderalexis.patitas.model.dto.request.CitaRequestDTO;
import com.coderalexis.patitas.model.dto.response.CitaResponseDTO;
import com.coderalexis.patitas.model.entity.Cita;
import com.coderalexis.patitas.repository.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CitaService {

    private final CitaRepository citaRepository;
    private final CitaMapper citaMapper;
    private final LocalTime startTime;
    private final LocalTime endTime;

    @Autowired
    public CitaService(CitaRepository citaRepository, CitaMapper citaMapper, CitaConfig citaConfig) {
        this.citaRepository = citaRepository;
        this.citaMapper = citaMapper;
        this.startTime = LocalTime.parse(citaConfig.getStartTime());
        this.endTime = LocalTime.parse(citaConfig.getEndTime());
    }

    public List<LocalDateTime> getAvailableSlots(LocalDate date) {
        validateDate(date);

        List<LocalDateTime> availableSlots = generateTimeSlots(date);
        Set<LocalDateTime> occupiedSlots = getOccupiedSlots(date);

        availableSlots.removeAll(occupiedSlots);
        return availableSlots;
    }

    private void validateDate(LocalDate date) {
        if (date == null || date.isBefore(LocalDate.now()) ||
                date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY) {
            throw new IllegalArgumentException("Fecha inválida o no laborable.");
        }
    }

    private List<LocalDateTime> generateTimeSlots(LocalDate date) {
        List<LocalDateTime> slots = new ArrayList<>();
        for (LocalTime time = startTime; time.isBefore(endTime); time = time.plusMinutes(30)) {
            slots.add(LocalDateTime.of(date, time));
        }
        return slots;
    }

    private Set<LocalDateTime> getOccupiedSlots(LocalDate date) {
        LocalDateTime startOfDay = date.atTime(startTime);
        LocalDateTime endOfDay = date.atTime(endTime);
        List<Cita> citasDelDia = citaRepository.findByFechaHoraBetween(startOfDay, endOfDay);
        return citasDelDia.stream()
                .map(Cita::getFechaHora)
                .collect(Collectors.toSet());
    }

    public List<CitaResponseDTO> getAllCitas() {
        List<Cita> citas = citaRepository.findAll();
        return citas.stream()
                .map(citaMapper::citaToCitaResponseDTO)
                .collect(Collectors.toList());
    }

    public List<CitaResponseDTO> getAllCitasNoAtendidas() {
        List<Cita> citas = citaRepository.findByAtendidaFalse();
        return citas.stream()
                .map(citaMapper::citaToCitaResponseDTO)
                .collect(Collectors.toList());
    }

    public CitaResponseDTO getCitaById(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cita no encontrada con ID: " + id));
        return citaMapper.citaToCitaResponseDTO(cita);
    }

    public CitaResponseDTO createCita(CitaRequestDTO citaRequestDTO) {
        Cita cita = citaMapper.citaRequestDTOToCita(citaRequestDTO);

        if (citaRepository.existsByFechaHora(cita.getFechaHora())) {
            throw new AppointmentNotAvailableException("El espacio ya está ocupado.");
        }

        Cita savedCita = citaRepository.save(cita);
        return citaMapper.citaToCitaResponseDTO(savedCita);
    }

    public CitaResponseDTO updateCita(Long id, CitaRequestDTO citaRequestDTO) {
        Cita citaExistente = citaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cita no encontrada con ID: " + id));

        citaMapper.updateCitaFromDto(citaRequestDTO, citaExistente);

        Cita updatedCita = citaRepository.save(citaExistente);
        return citaMapper.citaToCitaResponseDTO(updatedCita);
    }

    public void deleteCita(Long id) {
        if (!citaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cita no encontrada con ID: " + id);
        }
        citaRepository.deleteById(id);
    }

    public void markCitaAsAtendida(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cita no encontrada con ID: " + id));
        cita.setAtendida(true);
        citaRepository.save(cita);
    }
}