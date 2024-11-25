import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);
interface CitaDialogData {
  id?: number;
  nombreCliente: string;
  nombreMascota: string;
  fechaHora: Date;
  razonCita: string;
}

@Component({
  selector: 'app-cita-details-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    DatePipe,
    MatTooltipModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './cita-details-dialog.component.html',
  styleUrls: ['./cita-details-dialog.component.css']
})
export class CitaDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CitaDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CitaDialogData
  ) {}
}
