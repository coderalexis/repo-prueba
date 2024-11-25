package com.coderalexis.patitas.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;



// Cita.java
@Entity
@Table(name = "cita")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_cliente", nullable = false)
    @NotBlank(message = "El nombre del cliente es obligatorio")
    private String nombreCliente;

    @Column(name = "nombre_mascota", nullable = false)
    @NotBlank(message = "El nombre de la mascota es obligatorio")
    private String nombreMascota;

    @Column(name = "razon_cita", nullable = false)
    @NotBlank(message = "La razón de la cita es obligatoria")
    private String razonCita;

    @Column(name = "fecha_hora", nullable = false)
    @NotNull(message = "La fecha y hora de la cita es obligatoria")
    private LocalDateTime fechaHora;

    @Column(name = "atendida")
    private boolean atendida = false;
}
