import { Injectable } from '@angular/core';
import { User } from '../../features/dashboard/users/models';
import { delay, map, Observable, of } from 'rxjs';

let DATABASE: User[] = [
  {
    id: 'dbv3Da',
    firstName: 'Goku',
    lastName: 'Son',
    createdAt: new Date(),
    email: 'gokussj3@gmail.com',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  getById(id: string): Observable<User | undefined> {
    return this.getUsers().pipe(map((users) => users.find((u) => u.id === id)));
  }

  getUsers(): Observable<User[]> {
    return new Observable((observer) => {
      // ACA HAY UN CAMBIO 1
      setInterval(() => {
        // observer.error('Error al cargar los datos');
        observer.next(DATABASE);
        observer.complete();
      }, 3000);
    });
  }

  removeUserById(id: string): Observable<User[]> {
    DATABASE = DATABASE.filter((user) => user.id != id);
    return of(DATABASE).pipe(delay(1000));
  }

  updateUserById(id: string, update: Partial<User>) {
    DATABASE = DATABASE.map((user) =>
      user.id === id ? { ...user, ...update } : user
    );

    return new Observable<User[]>((observer) => {
      setInterval(() => {
        observer.next(DATABASE);
        observer.complete();
      }, 1000);
    });
  }
}
