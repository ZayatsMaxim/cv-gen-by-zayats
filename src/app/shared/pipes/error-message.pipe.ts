import { Pipe, type PipeTransform } from '@angular/core';
import { VALUDATION_MESSAGES } from '../errors/validation-messages.errors';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'getErrorMessage',
  standalone: true,
})
export class ErrorMessagePipe implements PipeTransform {
  transform(errors: ValidationErrors, ...args: unknown[]): string {
    for (const error in errors) {
      if (error in VALUDATION_MESSAGES) {
        const key = error as keyof typeof VALUDATION_MESSAGES;
        return VALUDATION_MESSAGES[key];
      }
    }
    return '';
  }
}
