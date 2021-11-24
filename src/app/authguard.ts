import { CanActivate, Router } from '@angular/router';
import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private commonService: CommonService, private router: Router) {

    }

    canActivate(): boolean {

        if (localStorage.getItem("userId") != "-1") {
            return true;
        } else {
            this.router.navigate(['']);
            return false;
        }

    }
}