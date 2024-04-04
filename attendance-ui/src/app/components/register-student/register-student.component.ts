import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {
  private trigger: Subject<any> = new Subject();
  webcamImage: WebcamImage | undefined;
  private nextWebcam: Subject<any> = new Subject();
  image: any;
  sysImage = '';

  studentForm = this.fb.group({
    name: ['', [Validators.required]],
    id: ['', Validators.required],
    image: ['']
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private httpClient: HttpClient
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
    this.trigger.next(void 0);
    let formData: FormData = new FormData();
    formData.append('face', this.image, this.image.name);
    formData.append('name', name)
    formData.append('id', id)
    this.httpClient.post('http://localhost:3000/create-face', formData).subscribe((data) => {
      console.log(data)
    });
    this.snack.open('Student registered');
    // call backend
    this.router.navigate(["/"])
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    const arr = this.webcamImage.imageAsDataUrl.split(",");
    if (arr && arr.length > 1) {
      const part = arr[0].match(/:(.*?);/);
      if (part && part.length > 0) {
        const mime = part[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        this.image = new File([u8arr], 'file', { type: mime })
        console.log(this.image);
      }
    }
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

}
