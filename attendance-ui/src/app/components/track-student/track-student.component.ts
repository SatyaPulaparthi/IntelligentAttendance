import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-student',
  templateUrl: './track-student.component.html',
  styleUrls: ['./track-student.component.scss']
})
export class TrackStudentComponent {

  constructor(private snack: MatSnackBar, private router: Router) { }

  submit() {
    // call backend
    this.snack.open("Tracked student successfully")
    this.router.navigate(['/'])
  }
}
