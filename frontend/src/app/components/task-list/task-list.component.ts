import { Component, inject } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../services/socket.service';

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
 socketService = inject(SocketService)
  ngOnInit(): void {
    this.loadTasks();

        // Listen for real-time task updates
        this.socketService.onTaskCreated().subscribe((task) => {
          this.tasks.push(task);
        },
        (error) => {
          console.log(error)
        });

        this.socketService.onTaskUpdated().subscribe((updatedTask) => {
          console.log("updatedTask", updatedTask)
          const index = this.tasks.findIndex(task => task._id === updatedTask._id);
          if (index !== -1) this.tasks[index] = updatedTask;
        });

        this.socketService.onTaskDeleted().subscribe((taskId) => {
          this.tasks = this.tasks.filter((task) => task._id !== taskId);
        });

  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      // console.log(tasks)
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
