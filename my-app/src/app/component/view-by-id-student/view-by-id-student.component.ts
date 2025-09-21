import { Component, getNgModuleById, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/model/student';
import { NetworkCallServiceService } from 'src/app/services/network-call-service.service';

@Component({
  selector: 'app-view-by-id-student',
  templateUrl: './view-by-id-student.component.html',
  styleUrls: ['./view-by-id-student.component.css']
})
export class ViewByIdStudentComponent implements OnInit{
  student!:Student;

  constructor(private ss : NetworkCallServiceService, private ar: ActivatedRoute){

  }

  ngOnInit(): void {
    const id = String(this.ar.snapshot.paramMap.get('id'));
    if(id){
      this.getById(id);
    }
  }

  getById(id:any){
    if(id){
      this.ss.viewById(id).subscribe((data)=>{
        this.student = data;
      })
    }
  }
}
