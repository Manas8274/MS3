import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './component/add-student/add-student.component';
import { ViewStudentComponent } from './component/view-student/view-student.component';
import { ViewByIdStudentComponent } from './component/view-by-id-student/view-by-id-student.component';
import { UpdateStudentComponent } from './component/update-student/update-student.component';

const routes: Routes = [
  {path:'add',component:AddStudentComponent},
  {path:'view',component:ViewStudentComponent},
  {path:'viewById/:id',component:ViewByIdStudentComponent},
  {path:'update/:id',component:UpdateStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
