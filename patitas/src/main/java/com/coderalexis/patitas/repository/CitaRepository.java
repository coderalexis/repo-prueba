package com.coderalexis.patitas.repository;

import com.coderalexis.patitas.model.entity.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

    /**
     * Verifica si existe una cita en una fecha y hora específica.
     *
     * @param fechaHora La fecha y hora de la cita.
     * @return true si existe una cita en esa fecha y hora, false en caso contrario.
     */
    boolean existsByFechaHora(LocalDateTime fechaHora);

    /**
     * Busca citas entre dos fechas y horas.
     *
     * @param start La fecha y hora de inicio.
     * @param end   La fecha y hora de fin.
     * @return Lista de citas entre las fechas y horas especificadas.
     */
    List<Cita> findByFechaHoraBetween(LocalDateTime start, LocalDateTime end);

    /**
     * Obtiene todas las citas que no han sido atendidas.
     *
     * @return Lista de citas no atendidas.
     */
    List<Cita> findByAtendidaFalse();
}

