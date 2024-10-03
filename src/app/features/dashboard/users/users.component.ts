import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './models';

const ELEMENT_DATA: User[] = [
  {
    id: 'dbv3Da',
    firstName: 'Goku',
    lastName: 'Son',
    createdAt: new Date(),
    email: 'gokussj3@gmail.com',
  },
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource = ELEMENT_DATA;

  usuario = {
    nombre: 'Josue',
    apellido: 'Baez',
  };

  constructor(private matDialog: MatDialog) {}

  openModal(): void {
    this.matDialog
      .open(UserDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          console.log('RECIBIMOS: ', result);

          if (!!result) {
            this.dataSource = [
              ...this.dataSource,
              // { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
            ];
          }
        },
      });
  }
}
