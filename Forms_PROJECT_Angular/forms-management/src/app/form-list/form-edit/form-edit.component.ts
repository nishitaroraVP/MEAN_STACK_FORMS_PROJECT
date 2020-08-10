import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms'
@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {
  dynamicForm:FormGroup;
  surveyForm:FormGroup;  
  inputTypes:string[] = ['paragraph','checkbox','radio','select']; 
  dynamicInputs=[];                                              
  constructor() { }

  ngOnInit(): void {
    this.dynamicForm = new FormGroup({
      'question':new FormControl(null,Validators.required),
      'type': new FormControl(null,Validators.required),
      'options':new FormArray([],Validators.required)
    })
    this.surveyForm = new FormGroup({});
  }
  onAddInputElement(){

    this.dynamicInputs.push({label:this.dynamicForm.value.question,
      type:this.dynamicForm.value.type,
      options:this.dynamicForm.value?.options
    });
    console.log(this.dynamicInputs);

  }
  onAddOption(){
    const formControl = new FormControl(null);
    (<FormArray>this.dynamicForm.get('options')).push(formControl);
  }
  onSubmitSurveyForm(){
    
  }

}
