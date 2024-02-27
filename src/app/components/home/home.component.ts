import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { Confirmable } from '../../common/decorators/confirmable.decorator';
import { NotNullDecorator } from '../../common/decorators/not-null.decorator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AuthorizationDecorator } from '../../common/decorators/authorization.decorator';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../common/service/api.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbar,
    MatSlideToggle,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeComponent implements OnInit{
  roleControl = new FormControl<boolean>(false);

  constructor(private _apiService: ApiService, private _router: Router) {
  }

  ngOnInit() {
    this.roleControl
      .valueChanges
      .pipe(untilDestroyed(this), catchError(err => throwError(() => err)))
      .subscribe((x) => {
        if(x){
          this._apiService
            .setCurrentUserRole('admin');
        } else {
          this._apiService
            .setCurrentUserRole('potato');
        }
      })
  }


  @Confirmable('title', 'text')
  confirmableDecoratorFunction() {
    console.log('Megyen!');
  }

  @NotNullDecorator
  updateProduct(id: number, product: { name: string; price: number }) {
    console.log(`Product updated: ${JSON.stringify(product)}`);
  }

  @AuthorizationDecorator('admin')
  teszt() {
    alert('megfutott a belso fuggveny')
  }

  goTable(){
    this._router.navigateByUrl('/table')
  }
}
