import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkCallServiceService {
  private apiUrl: string = "https://ec2-13-232-238-68.projects.wecreateproblems.com/proxy/3000/studentData";

  constructor(private httpCall: HttpClient){

  }

  addStudent(std:Student):Observable<any>{
    return this.httpCall.post(this.apiUrl,std);
  }

  viewStudent():Observable<any>{
    return this.httpCall.get(this.apiUrl);
  }

  viewById(id:any):Observable<any>{
    return this.httpCall.get(this.apiUrl+"/"+id);
  }

  deleteStudent(id:any):Observable<any>{
    return this.httpCall.delete(this.apiUrl+"/"+id)
  }

  update(id:any,std:Student):Observable<any>{
    return this.httpCall.put(`${this.apiUrl}/${id}`, std);
  }

}
