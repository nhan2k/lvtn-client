import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred';
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Error: ${error.error.error}`;
  } else {
    // Server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.error}`;
  }
  console.error(errorMessage);
  return throwError(() => errorMessage);
}
