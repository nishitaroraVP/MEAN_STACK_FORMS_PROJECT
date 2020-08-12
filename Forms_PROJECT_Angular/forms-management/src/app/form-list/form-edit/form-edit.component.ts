import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray,NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {
  dynamicForm:FormGroup;
  surveyForm:NgForm;  
  inputTypes:string[] = ['paragraph','checkbox','radio','select']; 
  dynamicInputs=[];                                              
  constructor(private http:HttpClient,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.dynamicForm = new FormGroup({
      'question':new FormControl(null,Validators.required),
      'type': new FormControl(null,Validators.required),
      'options':new FormArray([],Validators.required)
    })
    
  }
  onAddInputElement(){

    this.dynamicInputs.push({label:this.dynamicForm.value.question,
      type:this.dynamicForm.value.type,
      options:this.dynamicForm.value?.options
    });
    this.dynamicForm.reset();

  }
  onAddOption(){
    const formControl = new FormControl(null);
    (<FormArray>this.dynamicForm.get('options')).push(formControl);
  }
  onSubmitSurveyForm(surveyForm:NgForm){
    this.http.post('http://localhost:3000/create/form',this.dynamicInputs).subscribe((response:any)=>{
      console.log(response);
      let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
        data:{
          url:`http://localhost:4200/forms/${response.slug}/view` 
        },
        height: '400px',
        width: '600px',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    })
    
    
    
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogref:MatDialogRef<DialogElementsExampleDialog>){}

  onCloseDialog(){
    this.dialogref.close();
  }
}
