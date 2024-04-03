import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { table } from 'console';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  data: any[] = [];
  constructor(private httpClient: HttpClient) {}

  getAttendanceData() {
    return this.httpClient.get('http://localhost:3000/attendance').pipe(tap((data: any) => {
      this.data = data;
      console.log(data)
    }));
  }
}
