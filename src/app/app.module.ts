import { HttpClientModule } from '@angular/common/http';
import { SummaryPipe } from './summary.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './task/tasks.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { TaskService } from './core/task.service';
import { AddTaskComponent } from './task/add-task.component';
import { UpdateTaskComponent } from './task/update-task.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  // {
  //   path: 'reports',
  //   component: ReportsComponent
  // },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'create-task',
    component: AddTaskComponent
  },
  {
    path: 'update-task/:id',
    component: UpdateTaskComponent
  },
  {
    path: 'externalRedirect',  //whatever string you want as long as it's not used by another rout 
    resolve: {
      url: 'externalUrlRedirectResolver'
      // url: 'http://www.google.com', //externalUrlProvider,
    },
    data: {
      externalUrl: 'http://www.google.com'
    },
    // We need a component here because we cannot define the route otherwise
    component: ReportsComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    TasksComponent,
    ReportsComponent,
    SettingsComponent,
    SlidebarComponent,
    SummaryPipe,
    AddTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
        // const externalUrl = route.paramMap.get('externalUrl');
        // window.open(externalUrl, '_self');
      }
    },
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
