import { Category } from './../models/category.modal';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly storageKey = 'categories';
  private categories: Category[] = [];
  

  constructor() {
    this.load();
  }

  private load() {
    const data = localStorage.getItem(this.storageKey);
    this.categories = data ? JSON.parse(data) : [];
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.categories));
  }

  getAll(): Category[] {
    return [...this.categories];
  }

  getById(id: string): Category | undefined {
    return this.categories.find(c => c.id === id);
  }

  add(category: Category) {
    this.categories.push(category);
    this.save();
  }

  update(id: string, updatedCategory: Partial<Category>) {
    const index = this.categories.findIndex(c => c.id === id);
    if (index !== -1) {
      this.categories[index] = {
        ...this.categories[index],
        ...updatedCategory,
      };
      this.save();
    }
  }

  remove(id: string) {
    this.categories = this.categories.filter(c => c.id !== id);
    this.save();
  }
}
