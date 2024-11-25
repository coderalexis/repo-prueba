package com.coderalexis.patitas.mapper;

import com.coderalexis.patitas.model.dto.request.CitaRequestDTO;
import com.coderalexis.patitas.model.dto.response.CitaResponseDTO;
import com.coderalexis.patitas.model.entity.Cita;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CitaMapper {

    CitaResponseDTO citaToCitaResponseDTO(Cita cita);

    Cita citaRequestDTOToCita(CitaRequestDTO citaRequestDTO);

    void updateCitaFromDto(CitaRequestDTO citaRequestDTO, @MappingTarget Cita cita);
}