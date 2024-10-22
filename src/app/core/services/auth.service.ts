import { Injectable } from '@angular/core';
import { AuthData } from '../../features/auth/models';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../features/dashboard/users/models';
import { generateRandomString } from '../../shared/utils';

const FAKE_USER: User = {
  email: 'admin@mail.com',
  firstName: 'admin',
  lastName: 'admin',
  id: generateRandomString(4),
  createdAt: new Date(),
  password: '123456',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(data: AuthData): Observable<User> {
    if (data.email != FAKE_USER.email || data.password != FAKE_USER.password) {
      return throwError(() => new Error('Los datos son invalidos'));
    }
    return of(FAKE_USER);
  }
}
