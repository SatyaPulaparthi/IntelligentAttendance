import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { TrackStudentComponent } from './components/track-student/track-student.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent},
  { path: "register-student", component: RegisterStudentComponent },
  { path: "track-student", component: TrackStudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
