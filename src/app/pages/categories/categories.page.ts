import { Category } from './../../models/category.modal';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: Category[] = [];
  newCategory = '';
  categoryToEdit: Category | null = null;

  constructor(private readonly categoryService: CategoryService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.categories = this.categoryService.getAll();
  }

  addCategory() {
    if (!this.newCategory.trim()) return;

    if (this.categoryToEdit) {
      this.categoryService.update(this.categoryToEdit.id, {
        name: this.newCategory.trim(),
      });
      this.categoryToEdit = null;
    } else {
      this.categoryService.add({
        id: crypto.randomUUID(),
        name: this.newCategory.trim(),
      });
    }

    this.newCategory = '';
    this.load();
  }

  deleteCategory(id: string) {
    this.categoryService.remove(id);
    this.load();
  }

  editCategory(category: Category) {
    this.categoryToEdit = category;
    this.newCategory = category.name;
  }
}
