import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../models/task';
import { TaskService } from '../core/task.service';

@Component({
  selector: 'update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  title: string = 'update Task';
  taskForm: FormGroup;
  selectedTask: Task;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      priority: new FormControl('', [Validators.required, Validators.minLength(3)]),     //should be intance of class that drives from abstract control
      description: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      status: new FormControl(''),
      dueDate: new FormControl('')
    });
    const taskID: number = parseInt(this.route.snapshot.params['id'], 10);
    this.getTaskById(taskID);
  }

  getTaskById(id: number) {
    this.selectedTask =this.taskService.tasks.find(x => x.id === id);
  }

  saveChanges(): void {
    this.taskService.updateTask(this.selectedTask)
      .subscribe(
        (data: void) => { return console.log(`${this.selectedTask.description} updated successfully.`) },
        (err: any) => { return console.log(err) }
      );
  }

}
