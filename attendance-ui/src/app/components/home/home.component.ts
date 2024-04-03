import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MOCK_STUDENTS_DATA } from '../../mockdata';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  displayedColumns: string[] = ['student_name', 'student_id', 'has_attended'];
  students = [];
  constructor(private router: Router, private authService: AuthService, 
    private attendanceService: AttendanceService) { }

  registerNewStudent() {
    this.router.navigate(["register-student"]);
  }

  viewAttendanceRecords() {
    this.router.navigate(["track-student"])
  }

  get datasource() {
    return this.attendanceService.data;
  }

  pieChartData: any[] = [
    {
      "name": "Attended",
      "value": this.datasource.filter(student => student.has_attended).length
    },
    {
      "name": "Not Attended",
      "value": this.datasource.filter(student => !student.has_attended).length
    }
  ];

  // Customize pie chart settings if needed
  view: [number, number] = [500, 300];
  gradient: boolean = true;

  // Function to format tooltip
  labelFormatting(c: any): string {
    return `${c.label}: ${c.data.toLocaleString()}`;
  }

  exportToCSV() {
    const csvContent = this.convertToCSV(this.datasource);
    this.downloadCSV(csvContent, 'attendance_data.csv');
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    return `${header}\n${rows.join('\n')}`;
  }

  downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
