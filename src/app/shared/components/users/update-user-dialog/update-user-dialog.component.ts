import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '@core/models/user';

export interface UpdateUserDialogData {
  user: User;
}

@Component({
  selector: 'app-update-user-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-user-dialog.component.html',
  styleUrl: './update-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserDialogComponent {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UpdateUserDialogComponent>);
  public readonly data = inject(MAT_DIALOG_DATA);

  public form = this.formBuilder.group({
    name: [
      this.data.user.name,
      [Validators.required, Validators.maxLength(100)],
    ],
    email: [this.data.user.email, [Validators.required, Validators.email]],
  });

  confirm() {
    if (!this.form.touched) {
      this.dialogRef.close({ confirmed: false });
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;

    const updatedUser = this.data.user;

    updatedUser.name = value.name;
    updatedUser.email = value.email;

    this.dialogRef.close({ confirmed: true, user: updatedUser });
  }
}
