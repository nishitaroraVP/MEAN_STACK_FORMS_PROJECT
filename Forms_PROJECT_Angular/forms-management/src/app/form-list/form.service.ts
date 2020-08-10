import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
@Injectable({providedIn:'root'})
export class FormService{
    subject = new Subject();
    constructor(private http:HttpClient){
        
    }
    getForms(){
        this.http.get('http://localhost:3000/forms').subscribe((forms)=>{
            this.subject.next(forms);
            return forms;
            
        })
    }
}