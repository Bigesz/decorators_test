import { Component} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {DialogService} from "../../common/dialog/dialog.service";
import {MatToolbar} from "@angular/material/toolbar";
import {Confirmable} from "../../common/decorators/confirmable.decorator";
import {NotNullDecorator} from "../../common/decorators/not-null.decorator";
import {MatSlideToggle} from "@angular/material/slide-toggle";

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
    MatSlideToggle
  ]
})
export class HomeComponent {
  constructor(private _dialogService: DialogService) {
  }

  @Confirmable('title', 'text')
  confirmableDecoratorFunction(){
    console.log('Megyen!')
  }

  @NotNullDecorator
  updateProduct(id: number, product: { name: string; price: number }) {
    console.log(`Product updated: ${JSON.stringify(product)}`);
  }
}
