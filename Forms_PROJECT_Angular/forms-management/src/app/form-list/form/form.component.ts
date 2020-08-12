import { Component, OnInit } from '@angular/core';
import {FormService} from '../form.service';
import {ActivatedRoute} from '@angular/router'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  slug:string;
  form:any;
  questions:[]=[];
  result:any={responses:[]};
  constructor(private formService:FormService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.slug = params['slug']
      this.formService.getFormBySlug(this.slug);
      this.formService.formBySlug.subscribe((form)=>{
        this.form = form;
        this.questions = this.form.questions
      })
    })
    
  }
  onSubmitSurveyForm(surveyForm:NgForm){
    this.result['slug'] = this.slug;
    for (const key in  surveyForm.value ) {
      if(key!=='email'){
        this.result.responses.push({email:surveyForm.value.email,response:surveyForm.value[key]})
      }
    }
   this.formService.SubmitResponse(this.result); 
  }

}
