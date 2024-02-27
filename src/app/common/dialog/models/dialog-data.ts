import { HttpErrorResponse } from '@angular/common/http';

export interface DialogData {
  title: string;
  text: string;
  confirmButtonText: string;
  cancelButtonText: string;
  errorResponse: HttpErrorResponse;
}
