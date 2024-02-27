import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _baseConfig: MatDialogConfig = {
    width: '500px',
    height: 'auto',
    maxWidth: '100vw',
    maxHeight: '100vh',
    disableClose: true
  };

  constructor(private _dialog: MatDialog) {}

  open(config: MatDialogConfig, callback?: () => void) {
    return this._dialog
      .open(DialogComponent, config)
      .afterClosed()
      .subscribe(res => res && callback && callback());
  }

  public confirm(
    title: string,
    text: string | null = null,
    callback: () => void,
    confirmButtonText = 'common.yes',
    cancelButtonText = 'common.no'
  ) {
    const config = {
      ...this._baseConfig,
      data: {
        title,
        text,
        confirmButtonText,
        cancelButtonText
      }
    };
    return this.open(config, callback);
  }

  public success(title: string, text?: string, confirmButtonText: string = 'common.ok') {
    const config = {
      ...this._baseConfig,
      data: {
        title,
        text,
        confirmButtonText
      }
    };
    this.open(config);
  }

  public error(error: HttpErrorResponse, title: string, text?: string, confirmButtonText: string = 'common.ok') {
    const config = {
      ...this._baseConfig,
      data: {
        title,
        text,
        error,
        confirmButtonText
      }
    };
    this.open(config);
  }

  public warning(title: string, text?: string, confirmButtonText: string = 'common.ok') {
    const config = {
      ...this._baseConfig,
      data: {
        title,
        text,
        confirmButtonText
      }
    };
    this.open(config);
  }

  confirmReturnTrueOrFalse(
    title: string,
    text: string,
    confirmButtonText: string = 'common.yes',
    cancelButtonText: string = 'common.no'
  ) {
    const config = {
      width: '500px',
      height: 'auto',
      disableClose: true,
      position: {
        top: '0px'
      },
      panelClass: ['mt-5'],
      data: {
        title,
        text,
        confirmButtonText,
        cancelButtonText,
        isCancellable: true
      }
    };

    return this._dialog.open(DialogComponent, config).afterClosed();
  }
}
