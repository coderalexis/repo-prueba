export interface Cita {
  id?: number;
  nombreCliente: string;
  nombreMascota: string;
  razonCita: string;
  fechaHora: string | Date;
  atendida: boolean;
}


export interface TimeSlot {
  hour: string;
  datetime: string;
}
