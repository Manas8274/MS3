import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Student } from 'src/app/model/student';
import { NetworkCallServiceService } from 'src/app/services/network-call-service.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit{
  fg!: FormGroup;
  successMessage:string = '';
  erroeMessage:string='';

  constructor(private ss: NetworkCallServiceService, private fb: FormBuilder){

  }

  ngOnInit(): void {
    
      this.fg = this.fb.group({
        username: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
        password: ['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&_])[a-zA-Z0-9!@#$%&_]{8,}$/)]],
        email: ['',[Validators.required,Validators.email,this.emailValidator]],
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

  emailValidator(control:AbstractControl) : ValidationErrors | null{
    const emailId = control.value;
    let value = JSON.parse(localStorage.getItem('studentData') || '{}');
    if(Array.isArray(value)){
      const emailIds = value.map((student:Student)=>
        student.email
      );
      if(emailIds.includes(emailId)){
        return {invalidEmail : true}
      }
    }
    return null;
  }

  addStudent(){
    if(this.fg.valid){
      this.ss.addStudent(this.fg.value).subscribe((data)=>{
        console.log(data);
        //console.log("success")
        this.successMessage = 'Student Added Successfully';
        this.fg.reset();
      })
    }else{
      this.erroeMessage = 'Failded to add Student';
    }

  }

}
