import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators'
@Injectable({providedIn:'root'})
export class FormService{
    subject = new Subject();
    formBySlug = new Subject();
    ApiErrors = new Subject();
    constructor(private http:HttpClient){
        
    }
    getForms(){
        this.http.get('http://localhost:3000/forms').pipe(map(response=>response
        )).subscribe((forms)=>{
            this.subject.next(forms);
            return forms;
            
        },(error)=>{
            this.ApiErrors.next(error);
        })
    }
    getFormBySlug(slug:string){
        this.http.get(`http://localhost:3000/form/${slug}`).subscribe((data)=>{
            this.formBySlug.next(data);
        },(error)=>this.ApiErrors.next(error));
    }
    SubmitResponse(body:any){
        this.http.post('http://localhost:3000/form/response',body).subscribe((response)=>{
            console.log(response);
        },(error)=>this.ApiErrors.next(error))
    }
}