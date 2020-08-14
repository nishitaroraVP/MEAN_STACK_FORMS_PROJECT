import { Component, OnInit } from '@angular/core';
import {FormService} from '../../form.service';
import {ActivatedRoute,Router} from '@angular/router'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {
  slug:string;
  form:any;
  questions:[]=[];
  result:any={responses:[]};
  constructor(private formService:FormService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    
    this.route.parent.params.subscribe((params)=>{
      this.slug = params['slug']
      this.formService.getFormBySlug(this.slug);
      this.formService.formBySlug.subscribe((form)=>{
        this.form = form;
        this.questions = this.form.questions;
      })
    })
    
  }
  onSubmitSurveyForm(surveyForm:NgForm){
    console.log(surveyForm);
    this.result['slug'] = this.slug;
    for (const key in  surveyForm.value ) {
      if(key!=='email'){
        this.result.responses.push({email:surveyForm.value.email,response:surveyForm.value[key]})
      }
    }
    
   this.formService.SubmitResponse(this.result);
   this.router.navigate(['/']); 
  }
}
