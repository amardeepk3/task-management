import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: Task[] = [];
  statusFilter: string = 'all';  // Default filter value


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      console.log(tasks)
      this.tasks = tasks;

    },
      (error) => {
        console.log(error)
      });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== id);
    },
      (error) => {
        console.log(error)
      });
  }

  applyFilter(): void {
    this.taskService.filterTaskByStatus(this.statusFilter).subscribe((tasks) => {
      this.tasks = tasks;
    },
      (error) => {
        console.log(error)
      });
  }
}
