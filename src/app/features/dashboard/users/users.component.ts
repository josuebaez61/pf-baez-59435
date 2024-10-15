import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './models';
import { UsersService } from '../../../core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource: User[] = [];

  isLoading = false;

  usuario = {
    nombre: 'Josue',
    apellido: 'Baez',
  };

  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      // this.dataSource = this.dataSource.filter((user) => user.id !== id);
      this.isLoading = true;
      this.usersService.removeUserById(id).subscribe({
        next: (users) => {
          this.dataSource = users;
        },
        error: (err) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], {
      relativeTo: this.activatedRoute,
    });
  }

  openModal(editingUser?: User): void {
    this.matDialog
      .open(UserDialogComponent, {
        data: {
          editingUser,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingUser) {
              this.handleUpdate(editingUser.id, result);
            } else {
              this.dataSource = [...this.dataSource, result];
            }
          }
        },
      });
  }

  handleUpdate(id: string, update: User): void {
    this.isLoading = true;
    this.usersService.updateUserById(id, update).subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      error: (err) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
