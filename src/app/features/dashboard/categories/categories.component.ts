import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  categoryForm: FormGroup;

  isEditing?: Category;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isEditing = undefined;
      },
    });
  }

  onCreate(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
    } else {
      this.categoriesService.createCategory(this.categoryForm.value).subscribe({
        next: (categoryCreated) => {
          this.categories = [...this.categories, categoryCreated];
          this.categoryForm.reset();
          this.categoryForm.get('name')?.markAsUntouched();
        },
      });
    }
  }

  onEdit(category: Category): void {
    this.isEditing = category;
    this.categoryForm.patchValue(category);
  }

  handleSubmit(): void {
    if (this.isEditing) {
      this.categoriesService
        .editCategory(this.isEditing.id, this.categoryForm.value)
        .subscribe({
          next: () => {
            this.loadCategories();
            this.categoryForm.reset();
            this.categoryForm.get('name')?.markAsUntouched();
          },
        });
    } else {
      this.onCreate();
    }
  }
}
