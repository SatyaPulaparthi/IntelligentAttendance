import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataGuard implements CanActivate {

  constructor(private attandanceService: AttendanceService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // should return true if the getAttendanceData is fetched successfully else false
      return this.attandanceService.getAttendanceData().toPromise().then(
        data => {
          return true;
        },
        error => {
          return false;
        });
      };
}
