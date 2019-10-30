import { CustomValidators } from '../common/validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../models/task';
import { TaskService } from '../core/task.service';

@Component({
  selector: 'create-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  title: string = 'Create Task';
  taskForm: FormGroup;
  jsonData: any;
  submitted = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      priority: new FormControl('', [Validators.required, Validators.minLength(3), CustomValidators.cannotContainSpace]),     //should be intance of class that drives from abstract control
      description: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      status: new FormControl(''),
      dueDate: new FormControl('')
    })
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.taskForm.valid);
    if (!this.taskForm.valid)
      return false;
    else {
      this.jsonData = this.taskForm.value;
      this.taskService.addTask(this.taskForm.value);
    }

    let newTask: Task = this.taskForm.value;
    this.taskService.addTask(newTask)  //add task component
      .subscribe(
        (data: Task) => { return console.log(data); },
        (err: any) => { return console.log(err); }
      );

  }

}
