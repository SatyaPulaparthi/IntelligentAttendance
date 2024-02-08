import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {

  studentForm = this.fb.group({
    name: ['', [Validators.required]],
    id: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {}

  get name() {
    return this.studentForm.get('name');
  }

  get id() {
    return this.studentForm.get('id');
  }

  submit() {
    const { name, id } = this.studentForm.value;

    if (!this.studentForm.valid || !name || !id) {
      return;
    }

    this.snack.open('Student registered');
    // call backend
    this.router.navigate(["/"])
  }

}
