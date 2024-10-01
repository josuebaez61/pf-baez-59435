import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styles: ``,
})
export class UserDialogComponent {
  constructor(private matDialogRef: MatDialogRef<UserDialogComponent>) {}

  onSave(): void {
    this.matDialogRef.close({ result: 'ok' });
  }
}
