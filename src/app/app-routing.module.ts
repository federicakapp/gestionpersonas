import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaDeComponent } from './sec-info/acerca-de/acerca-de.component';


const routes: Routes = [
  {path:'acerca-de', component: AcercaDeComponent},
  {path: 'inicio', component: InicioComponent},
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '**', component: InicioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
