import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-track-student',
  templateUrl: './track-student.component.html',
  styleUrls: ['./track-student.component.scss']
})
export class TrackStudentComponent {
  private trigger: Subject<any> = new Subject();
  webcamImage: WebcamImage | undefined;
  private nextWebcam: Subject<any> = new Subject();
  image: any;
  sysImage = '';

  constructor(private snack: MatSnackBar, 
    private router: Router, 
    private httpClient: HttpClient) { }

  submit() {
    // call backend
    console.log('submitttedd')
    this.trigger.next(void 0);
    let formData: FormData = new FormData();
    formData.append('face', this.image, this.image.name);
    this.httpClient.post('http://localhost:3000/check-face', formData).subscribe((data) => {
      console.log(data)
    });
    this.snack.open("Tracked student successfully")
    this.router.navigate(['/'])
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
