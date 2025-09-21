import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NetworkCallServiceService } from 'src/app/services/network-call-service.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit{
  fg!: FormGroup;
  id$: any;
  

  constructor(private ss: NetworkCallServiceService, private fb: FormBuilder, private ar:ActivatedRoute,
    private route: Router
  ){

  }

  ngOnInit(): void {

      this.id$ = String(this.ar.snapshot.paramMap.get('id'))
      if(this.id$){
        this.ss.viewById(this.id$).subscribe((data)=>{
          this.fg.patchValue(data);
        })
      }
    
      this.fg = this.fb.group({
        username: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
        password: ['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&_])[a-zA-Z0-9!@#$%&_]{8,}$/)]],
        email: ['',[Validators.required,Validators.email]],
        mobileNo: ['',[Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
        dateOfBirth: ['',[Validators.required,this.dateValid]],
        salary: ['',[Validators.required,this.salaryValid]]
      });
  }
  

  dateValid(control:AbstractControl) : ValidationErrors | null{
    const patt = /^\d{4}-\d{2}-\d{2}$/;
    if(!patt.test(control.value)){
      return {invalidDate: true}
    }
    return null;
  }

  salaryValid(control : AbstractControl) : ValidationErrors | null{
    if(control.value < 0){
      return {invalidSalary : true}
    }
    return null;
  }

 updateStudent(){
  if(this.fg.valid){
    this.ss.update(this.id$,this.fg.value).subscribe((data)=>{
      alert("Updated Succesfully");
      this.route.navigate(['/view']);
    })
  }
 }
}
