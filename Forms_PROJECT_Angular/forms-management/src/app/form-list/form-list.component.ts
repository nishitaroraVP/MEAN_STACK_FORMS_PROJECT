import { Component, OnInit } from '@angular/core';
import {FormService} from '../form-list/form.service'
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
  forms;
  constructor(private formService:FormService) { }

  ngOnInit(): void {
    this.formService.getForms();
    this.formService.subject.subscribe((forms)=>{
      this.forms = forms;
    })
  }
  
  

}
