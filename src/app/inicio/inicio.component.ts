import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EstudiantesApiService } from '../servicios/estudiantes-api.service';
import { Estudiante } from '../servicios/estudiante.interface';
import { EstudiantePost } from '../servicios/estudiantepost.interface';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  estudiantes: Estudiante[] | undefined;

  constructor(private fb: FormBuilder, private estuService: EstudiantesApiService) { }

  //Declaro el form
  formEstudiantes = this.fb.group({
    nombreApellido: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
    dni: ['',[Validators.required,  Validators.min(10000000), Validators.max(99999999)]],
    email: ['',[Validators.required, Validators.email]],
    fechaNacimiento: ['',[Validators.required]]

  })

  ngOnInit() {
    this.mostrarEstudiantes();
  }

  mostrarForm: boolean = false;

  mostrarEstudiantes() {
    this.estuService.obtenerEstudiantes().subscribe(
      data => this.estudiantes = data
    )
  }

  idEditando: number | null = null;
modoEdicion: boolean = false;


editarEstudiante(estudiante: Estudiante) {
  console.log('Editando ID:', this.idEditando);
console.log('Estudiante a enviar:', estudiante);
  this.formEstudiantes.patchValue({
    nombreApellido: estudiante.estu_nombreApellido,
    dni: estudiante.estu_dni,
    email: estudiante.estu_email,
    fechaNacimiento: estudiante.estu_fechaNac
  });

  this.idEditando = estudiante.estu_id; // guardamos el ID
  this.modoEdicion = true;
  this.mostrarForm = true;
}

onSubmit() {
  if (this.formEstudiantes.valid) {
    const formValue = this.formEstudiantes.value;

    const estudiante: EstudiantePost = {
      estu_nombreApellido: formValue.nombreApellido!,
      estu_dni: formValue.dni!,
      estu_email: formValue.email!,
      estu_fechaNac: formValue.fechaNacimiento!,
    };

    if (this.modoEdicion && this.idEditando !== null) {
      this.estuService.actualizarEstudiante(this.idEditando, estudiante).subscribe({
        next: () => {
          this.mostrarEstudiantes();
          this.formEstudiantes.reset();
          this.mostrarForm = false;
          this.modoEdicion = false;
          this.idEditando = null;
        },
        error: (err) => console.error('Error al actualizar estudiante', err)
      });
    } else {
      this.estuService.crearEstudiante(estudiante).subscribe({
        next: () => {
          this.mostrarEstudiantes();
          this.formEstudiantes.reset();
          this.mostrarForm = false;
        },
        error: (err) => console.error('Error al crear estudiante', err)
      });
    }
  }
}

eliminarEstudiante(id: number) {
  const confirmar = confirm('¿Estás seguro de que querés eliminar este estudiante?');

  if (confirmar) {
    this.estuService.eliminarEstudiante(id).subscribe({
      next: () => {
        this.mostrarEstudiantes(); // recargar la lista
      },
      error: (err) => {
        console.error('Error al eliminar estudiante', err);
      }
    });
  }
}




}
