package com.coderalexis.patitas.model.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class CitaRequestDTO {

    @NotBlank
    private String nombreCliente;

    @NotBlank
    private String nombreMascota;

    @NotBlank
    private String razonCita;

    @NotNull
    @FutureOrPresent
    private LocalDateTime fechaHora;

}