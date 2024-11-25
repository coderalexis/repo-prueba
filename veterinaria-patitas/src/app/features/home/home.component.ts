import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatButton,
    MatChip,
    MatChipSet,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  doctors = [
    {
      name: 'Dr. Juan Pérez',
      specialty: 'Cirujano Veterinario',
      description: 'Especialista en cirugías de tejidos blandos',
      image: 'assets/images/doctors/dr-juan-perez.jpg'
    },
    {
      name: 'Dra. María García',
      specialty: 'Medicina Interna',
      description: 'Experta en diagnóstico y tratamiento de enfermedades complejas',
      image: 'assets/images/doctors/dra-maria-garcia.jpg'
    },
    {
      name: 'Dr. Carlos Rodríguez',
      specialty: 'Medicina Preventiva',
      description: 'Especialista en vacunación y cuidado preventivo',
      image: 'assets/images/doctors/dr-carlos-rodriguez.jpg'
    }
  ];


  handleImageError(event: any) {
    event.target.src = 'assets/images/doctors/default-doctor.webp';
  }
}
