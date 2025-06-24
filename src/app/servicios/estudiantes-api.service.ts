import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estudiante } from './estudiante.interface';
import { EstudiantePost } from './estudiantepost.interface';

let apiURL: string = "https://wwpsculufnurlfmphziz.supabase.co/rest/v1/Estudiantes";
let apiKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3cHNjdWx1Zm51cmxmbXBoeml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNjMzNDIsImV4cCI6MjA2MjgzOTM0Mn0.7woDa1U_Rupf9U71J3K4wu4loghyYI6H2QffWxkywjI";
let auth: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3cHNjdWx1Zm51cmxmbXBoeml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNjMzNDIsImV4cCI6MjA2MjgzOTM0Mn0.7woDa1U_Rupf9U71J3K4wu4loghyYI6H2QffWxkywjI";

const headers = new HttpHeaders({
  apikey: apiKey,
  Authorization: auth,
})

@Injectable({
  providedIn: 'root'
})
export class EstudiantesApiService {

  constructor(private httpCLI: HttpClient ) { }

  //Metodos para obtener datos de la api
  obtenerEstudiantes(){
    return this.httpCLI.get<Estudiante[]>(apiURL, {headers})
  }

  crearEstudiante(estudiante: EstudiantePost) {
  return this.httpCLI.post(apiURL, estudiante, {
    headers: headers.set('Content-Type', 'application/json').set('Prefer', 'return=representation')
  });
}

actualizarEstudiante(id: number, estudiante: EstudiantePost) {
  console.log(estudiante)
  return this.httpCLI.patch(`${apiURL}?estu_id=eq.${id}`, estudiante, {
    headers: headers.set('Content-Type', 'application/json')
  });
}

eliminarEstudiante(id: number) {
  return this.httpCLI.delete(`${apiURL}?estu_id=eq.${id}`, {
    headers: headers.set('Content-Type', 'application/json')
  });
}



}
