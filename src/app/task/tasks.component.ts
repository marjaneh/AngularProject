import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TaskStatus } from '../dataModel/task-status.enum';
import { Task } from '../models/task';
import { TaskService } from '../core/task.service';
import { TaskTrackerError } from '../models/TaskTrackerErrors';


@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  title = 'Tasks';
  iconUrl = 'assets/icons/Add_icon_off.png';
  tasks: Task[];
  selectedTask: Task;
  // keys = Object.keys;
  // values = Object.values;
  // taskStatus = TaskStatus;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  onMouseOver() {
    this.iconUrl = 'assets/icons/Add_icon_on.png'
  }

  onMouseOut() {
    this.iconUrl = 'assets/icons/Add_icon_off.png';
  }

  ngOnInit() {
    // this.taskService.getAllTasks()
    //   .subscribe(
    //     (data: Task[]) => this.tasks = data,
    //     (err: TaskTrackerError) => console.log(err.friendlyMessage),
    //     () => console.log('All done getting tasks.')
    //   );
    this.tasks = this.taskService.getTasks();
    const taskID: number = parseInt(this.route.snapshot.params['id'], 10);
    this.getTaskById(taskID);
  }

  getTaskById(id: number) {
    this.selectedTask = this.tasks.find(x => x.id === id);
  }

  deleteTask(id: number): void {
    alert(id + ' is deleted');
    let index: number = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(index, 1);
    // this.taskService.deleteTask(id).subscribe((res: void) => {
    //   let index: number = this.tasks.findIndex(task => task.id === id);
    //   this.tasks.splice(index, 1);
    // },
    //   (err: any) => console.log(err)
    // );
  }
}
