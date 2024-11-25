package com.coderalexis.patitas.model.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CitaResponseDTO {
    private Long id;
    private String nombreCliente;
    private String nombreMascota;
    private String razonCita;
    private LocalDateTime fechaHora;
    private boolean atendida;
}