import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {IUser} from "./model/user.interface";
import {MatIcon} from "@angular/material/icon";
import {NotNullDecorator} from "../../common/decorators/not-null.decorator";
import {MatIconButton} from "@angular/material/button";
import {Confirmable} from "../../common/decorators/confirmable.decorator";


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{
  users: IUser[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'actions'];


  ngOnInit() {
    this.generateUsers();
  }

  @NotNullDecorator
  editUser(user: IUser) {
    console.log('Szerkesztés: ', user);
    // Itt implementálható a tényleges szerkesztési logika
  }


  @Confirmable('Biztosan törlöd?', 'Ezt az usert:')
  deleteUser(user: IUser){
    this.users = this.users.filter(u => u.id !== user.id);
  }


  generateUsers() {
    for (let i = 1; i <= 20; i++) {
      this.users.push({
        id: i,
        name: i % 3 === 0 ? null : `User ${i}`,
        email: i % 4 === 0 ? null : `user${i}@example.com`,
        age: i % 5 === 0 ? null : 20 + i
      });
    }
  }
}
