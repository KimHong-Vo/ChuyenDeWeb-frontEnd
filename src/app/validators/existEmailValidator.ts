import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({ providedIn: 'root' })
export class ExistEmailValidator implements AsyncValidator {
    constructor(private userService: UserService) {}
    validate(
        control: AbstractControl
      ): Observable<ValidationErrors | null> {
        return this.userService.isEmailExist(control.value).pipe(map(isExist =>(!isExist?{emailNotExist:true}:null))
        ,catchError(()=>of(null)));
      }
      }

