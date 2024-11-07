import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskForm: FormGroup;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    // console.log(this.taskId)
    if (this.taskId) {
      this.loadTask();
    }
  }

  loadTask(): void {
    this.taskService.getTasks().subscribe((tasks: any[]) => {
      const task = tasks.find(t => t._id === this.taskId);
      if (task) {
        this.taskForm.patchValue(task);
      }
    });

    //     this.taskService.getTasksById(this.taskId).subscribe((tasks: any[]) => {
    //   const task = tasks.find(t => t.id === this.taskId);
    //   if (task) {
    //     this.taskForm.patchValue(task);
    //   }
    // });

  }

  onSubmit(): void {
    console.log(this.taskForm.invalid, this.taskForm.value)
    if (this.taskForm.invalid) return;

    const taskData: Task = {
      ...this.taskForm.value,
    };

    if (this.taskId) {
      this.taskService.updateTask(this.taskId, taskData).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.createTask(taskData).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
