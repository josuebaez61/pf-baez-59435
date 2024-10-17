import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../models';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss',
})
export class CategoriesTableComponent {
  @Input()
  categories: Category[] = [];

  @Output()
  edit = new EventEmitter<Category>();

  displayedColumns = ['id', 'name', 'createdAt', 'actions'];
}
