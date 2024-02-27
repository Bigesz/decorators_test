import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { DialogData } from './models/dialog-data';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatDialogModule, MatButton],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
