import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../features/dashboard/users/models';

@Pipe({
  name: 'userFullName',
})
export class UserFullNamePipe implements PipeTransform {
  transform(value: User, transform?: 'uppercase'): string {
    const result = value.firstName + ' ' + value.lastName;

    if (transform === 'uppercase') {
      return `${result}`.toUpperCase();
    }

    return result;
  }
}
