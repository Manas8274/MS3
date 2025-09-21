import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './component/add-student/add-student.component';
import { HttpClientModule}  from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewStudentComponent } from './component/view-student/view-student.component';
import { ViewByIdStudentComponent } from './component/view-by-id-student/view-by-id-student.component';
import { UpdateStudentComponent } from './component/update-student/update-student.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    ViewStudentComponent,
    ViewByIdStudentComponent,
    UpdateStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
