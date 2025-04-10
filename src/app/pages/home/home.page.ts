import { Category } from './../../models/category.modal';
import { Task } from './../../models/task.modal';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { RemoteConfigService } from '../../services/remote-config.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  selectedCategoryId: string | null = null;
  showCategories = false;
  newTaskTitle = '';

  constructor(
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService,
    private readonly remoteConfigService: RemoteConfigService
  ) {}

  ngOnInit(): void {
    this.remoteConfigService.init().then(() => {
      this.showCategories = this.remoteConfigService.getFlag('showCategories');
      console.log(this.showCategories);
      this.loadData();
    });
  }

  loadData() {
    this.tasks = this.taskService.getAll();
    this.categories = this.categoryService.getAll();
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    this.taskService.add({
      id: crypto.randomUUID(),
      title: this.newTaskTitle,
      completed: false,
      categoryId: this.selectedCategoryId || '',
    });
    this.newTaskTitle = '';
    this.loadData();
  }

  async toggleComplete(taskId: string) {
    const task = await this.taskService.getTaskById(taskId);
    if (task) {
      this.taskService.updateTaskPartial(taskId, { completed: !task.completed });
      this.loadData();
    }
  }

  deleteTask(taskId: string) {
    this.taskService.remove(taskId);
    this.loadData();
  }

  filterByCategory(categoryId: string | null) {
    this.selectedCategoryId = categoryId;
    this.loadData();
  }

  get filteredTasks() {
    if (!this.selectedCategoryId) return this.tasks;
    return this.tasks.filter((t) => t.categoryId === this.selectedCategoryId);
  }
}
