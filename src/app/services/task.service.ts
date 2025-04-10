import { Task } from './../models/task.modal';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly storageKey = 'tasks';
  private tasks: Task[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const data = localStorage.getItem(this.storageKey);
    this.tasks = data ? JSON.parse(data) : [];
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  getAll(categoryId?: string): Task[] {
    return categoryId
      ? this.tasks.filter((t) => t.categoryId === categoryId)
      : this.tasks;
  }

  add(task: Task) {
    this.tasks.push(task);
    this.save();
  }

  toggle(id: string) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.save();
    }
  }

  remove(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.save();
  }

  async getTaskById(id: string): Promise<Task | undefined> {
    return this.tasks.find((task) => task.id === id);
  }

  async updateTask(updatedTask: Task): Promise<void> {
    const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.save();
    }
  }

  async updateTaskPartial(id: string, partial: Partial<Task>): Promise<void> {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      const updated = { ...task, ...partial };
      await this.updateTask(updated);
    }
  }
}
