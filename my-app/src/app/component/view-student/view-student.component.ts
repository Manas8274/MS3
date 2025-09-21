import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, toArray } from 'rxjs';
import { Student } from 'src/app/model/student';
import { NetworkCallServiceService } from 'src/app/services/network-call-service.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit{
  data$:Observable<any[]>=of([]);
  finalData$:Observable<any[]>=of([]);

  constructor(private ss: NetworkCallServiceService,private aroute: ActivatedRoute, private router: Router){

  }

  ngOnInit(): void {
    const id = String(this.aroute.snapshot.paramMap.get('id'));
    if(id){
      this.deleteStudent(id);
    }

    this.getData();
  }

  getData(){
    this.data$ = this.ss.viewStudent();
    this.finalData$ = this.data$.pipe(
      map(student => student.sort((a:Student, b:Student) => a.username.localeCompare(b.username)))
    )
    this.finalData$.pipe(toArray());
    let insArray;
    this.finalData$.subscribe((ins) =>{
      insArray = ins;
      if(insArray){
        const Array = JSON.stringify(insArray);
        localStorage.setItem('studentData',Array);
      }
    })
  }

  searchValue(event:any){
    const valueGiven = event.target.value;
    if(!valueGiven){
      this.finalData$ = this.data$;
      return;
    }
    else{
      this.finalData$ = this.data$.pipe(
        map((students)=>{
          return students.filter((studenta)=>{
            return studenta.username.toString().includes(valueGiven) ||
            studenta.email.toString().includes(valueGiven)
          })
        })
      )
    }
  }
  
  deleteStudent(id:any){
    if(id){
      this.ss.deleteStudent(id).subscribe((data)=>{
        alert("Deleted Successfully");
        this.router.navigate(['/view']);
      })
    }
  }


  
}
