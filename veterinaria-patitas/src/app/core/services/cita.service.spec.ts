import { TestBed } from '@angular/core/testing';
import { CitaService } from './cita.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Cita } from '../models/cita.model';

describe('CitaService', () => {
  let service: CitaService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/citas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CitaService]
    });
    service = TestBed.inject(CitaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCitas', () => {
    it('debería realizar una solicitud GET y retornar un arreglo de citas', () => {
      const dummyCitas: Cita[] = [
        {
          id: 1,
          nombreCliente: 'Juan Pérez',
          nombreMascota: 'Firulais',
          razonCita: 'Vacunación',
          fechaHora: new Date(),
          atendida: false
        },
        {
          id: 2,
          nombreCliente: 'María Gómez',
          nombreMascota: 'Pelusa',
          razonCita: 'Chequeo',
          fechaHora: new Date(),
          atendida: false
        }
      ];

      service.getCitas().subscribe(citas => {
        expect(citas.length).toBe(2);
        expect(citas).toEqual(dummyCitas);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(dummyCitas);
    });
  });

  describe('#createCita', () => {
    it('debería realizar una solicitud POST y retornar la cita creada', () => {
      const newCita: Cita = {
        id: 3,
        nombreCliente: 'Carlos López',
        nombreMascota: 'Max',
        razonCita: 'Consulta',
        fechaHora: new Date(),
        atendida: false
      };

      service.createCita(newCita).subscribe(cita => {
        expect(cita).toEqual(newCita);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newCita);
      req.flush(newCita);
    });
  });

  describe('#deleteCita', () => {
    it('debería realizar una solicitud DELETE', () => {
      const citaId = 1;

      service.deleteCita(citaId).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${apiUrl}/${citaId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });


  describe('#updateCita', () => {
    it('debería realizar una solicitud PUT y retornar la cita actualizada', () => {
      const updatedCita: Cita = {
        id: 1,
        nombreCliente: 'Juan Pérez',
        nombreMascota: 'Firulais',
        razonCita: 'Vacunación anual',
        fechaHora: new Date(),
        atendida: true
      };

      service.updateCita(updatedCita.id!, updatedCita).subscribe(cita => {
        expect(cita).toEqual(updatedCita);
      });

      const req = httpMock.expectOne(`${apiUrl}/${updatedCita.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedCita);
      req.flush(updatedCita);
    });
  });

  describe('#getAvailableSlots', () => {
    it('debería realizar una solicitud GET con parámetros y retornar un arreglo de citas disponibles', () => {
      const date = '2023-10-10';
      const dummySlots = ['09:00', '10:00', '11:00'];

      service.getAvailableSlots(date).subscribe(slots => {
        expect(slots).toEqual(dummySlots);
      });

      const req = httpMock.expectOne(`${apiUrl}/available-slots?date=${date}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('date')).toBe(date);
      req.flush(dummySlots);
    });
  });
});
