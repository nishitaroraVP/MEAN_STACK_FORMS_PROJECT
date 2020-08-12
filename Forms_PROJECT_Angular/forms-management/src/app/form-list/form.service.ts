import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
@Injectable({providedIn:'root'})
export class FormService{
    subject = new Subject();
    formBySlug = new Subject();
    constructor(private http:HttpClient){
        
    }
    getForms(){
        this.http.get('http://localhost:3000/forms').subscribe((forms)=>{
            this.subject.next(forms);
            return forms;
            
        })
    }
    getFormBySlug(slug:string){
        this.http.get(`http://localhost:3000/form/${slug}`).subscribe((data)=>{
            this.formBySlug.next(data);
        })
    }
    SubmitResponse(body:any){
        this.http.post('http://localhost:3000/form/response',body).subscribe((response)=>{
            console.log(response);
        })
    }
}