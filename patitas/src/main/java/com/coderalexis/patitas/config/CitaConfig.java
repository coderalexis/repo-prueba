package com.coderalexis.patitas.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "cita")
@Data
public class CitaConfig {
    private String startTime;
    private String endTime;
}