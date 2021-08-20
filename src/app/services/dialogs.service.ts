import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

export enum DialogIcon {
    WARNING = 'warning',
}

@Injectable({providedIn: 'root'})
export class SweetAlertService {

    confirmDelete(
        title:string = "Are you sure?",
        text:string = "You won't be able to revert this!"):Promise<SweetAlertResult> {
        return Swal.fire({
            icon: 'warning',
            title, text,
            showCancelButton: true,
            confirmButtonText: `Delete`,
            cancelButtonText : `Cancel`,
            reverseButtons: true 
          });
    }

    success(content: string):Promise<SweetAlertResult>{
        return Swal.fire(content, '', 'success');
    }

    topEndMessage(title:string) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title,
            showConfirmButton: false,
            timer: 2000
        })
    }
}