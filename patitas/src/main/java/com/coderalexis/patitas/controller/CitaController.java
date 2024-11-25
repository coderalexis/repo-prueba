package com.coderalexis.patitas.controller;

import com.coderalexis.patitas.model.dto.request.CitaRequestDTO;
import com.coderalexis.patitas.model.dto.response.CitaResponseDTO;
import com.coderalexis.patitas.model.entity.Cita;
import com.coderalexis.patitas.service.CitaService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class CitaController {

    private final CitaService citaService;

    @Autowired
    public CitaController(CitaService citaService) {
        this.citaService = citaService;
    }

    @GetMapping
    public ResponseEntity<List<CitaResponseDTO>> getAllCitas() {
        log.info("Obteniendo todas las citas no atendidas");
        List<CitaResponseDTO> citas = citaService.getAllCitasNoAtendidas();
        return ResponseEntity.ok(citas);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CitaResponseDTO>> getAllCitasFull() {
        log.info("Obteniendo todas las citas");
        List<CitaResponseDTO> citas = citaService.getAllCitas();
        return ResponseEntity.ok(citas);
    }

    @PostMapping
    public ResponseEntity<CitaResponseDTO> createCita(@Valid @RequestBody CitaRequestDTO citaRequestDTO) {
        log.info("Creando una nueva cita");
        CitaResponseDTO savedCita = citaService.createCita(citaRequestDTO);
        return ResponseEntity.status(201).body(savedCita);
    }

    @GetMapping("/available-slots")
    public ResponseEntity<List<LocalDateTime>> getAvailableSlots(@RequestParam String date) {
        log.info("Obteniendo espacios disponibles para la fecha: {}", date);
        LocalDate localDate = LocalDate.parse(date);
        List<LocalDateTime> availableSlots = citaService.getAvailableSlots(localDate);
        return ResponseEntity.ok(availableSlots);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCita(@PathVariable Long id) {
        log.info("Eliminando cita con ID: {}", id);
        citaService.markCitaAsAtendida(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CitaResponseDTO> updateCita(@PathVariable Long id, @Valid @RequestBody CitaRequestDTO citaRequestDTO) {
        log.info("Actualizando cita con ID: {}", id);
        CitaResponseDTO updatedCita = citaService.updateCita(id, citaRequestDTO);
        return ResponseEntity.ok(updatedCita);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CitaResponseDTO> getCitaById(@PathVariable Long id) {
        log.info("Obteniendo cita con ID: {}", id);
        CitaResponseDTO citaResponseDTO = citaService.getCitaById(id);
        return ResponseEntity.ok(citaResponseDTO);
    }

    @PatchMapping("/{id}/atendida")
    public ResponseEntity<Void> markCitaAsAtendida(@PathVariable Long id) {
        log.info("Marcando cita como atendida con ID: {}", id);
        citaService.markCitaAsAtendida(id);
        return ResponseEntity.noContent().build();
    }
}