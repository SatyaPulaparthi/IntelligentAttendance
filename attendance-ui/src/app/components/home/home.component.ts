import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MOCK_STUDENTS_DATA } from '../../mockdata';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  displayedColumns: string[] = ['student_name', 'student_id', 'has_attended'];

  constructor(private router: Router) { }

  registerNewStudent() {
    this.router.navigate(["register-student"]);
  }

  viewAttendanceRecords() {
    this.router.navigate(["track-student"])
  }

  get datasource() {
    return MOCK_STUDENTS_DATA.attendance;
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

}
