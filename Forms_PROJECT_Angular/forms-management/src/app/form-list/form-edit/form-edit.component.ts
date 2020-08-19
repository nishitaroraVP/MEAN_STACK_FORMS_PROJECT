import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { inject } from '@angular/core/testing';
import { faPencilRuler, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router'
@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {
  dynamicForm: FormGroup;
  surveyForm: NgForm;
  inputTypes: string[] = ['paragraph','date', 'radio', 'select'];
  dynamicInputs = [];
  faPencilRuler = faPencilRuler;
  formName: string;
  FinalBody: any = {};
  faTrashAlt = faTrashAlt;
  addingInputElement: Boolean = false;
  constructor(private http: HttpClient,
    public dialog: MatDialog, private route: Router,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.dynamicForm = new FormGroup({
      'name': new FormControl(null),
      'question': new FormControl(null, Validators.required),
      'type': new FormControl(null, [Validators.required,Validators.]),
      'options': new FormArray([], Validators.required)
    })
  }
  onAddInputElement() {
    this.addingInputElement = true;
    if (this.dynamicInputs.length < 1) {
      this.formName = this.dynamicForm.value.name;
    }


    setTimeout(() => {
      this.addingInputElement = false;
      this.dynamicInputs.push({
        label: this.dynamicForm.value.question,
        type: this.dynamicForm.value.type,
        options: this.dynamicForm.value?.options

      });
      this.dynamicForm.reset();
    }, 500);


  }
  onAddOption() {
    const formControl = new FormControl(null);
    (<FormArray>this.dynamicForm.get('options')).push(formControl);
  }
  onSubmitSurveyForm(surveyForm: NgForm) {
    console.log(this.formName)
    this.FinalBody.name = this.formName
    this.FinalBody.dynamicInputs = this.dynamicInputs;
    this.http.post('http://localhost:3000/create/form', this.FinalBody, { observe: 'body' }).subscribe((response: any) => {
      let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
        data: {
          url: window.location.origin+`/forms/${response.slug}/view/form`
          
        },
        height: '400px',
        width: '600px',
      });
      dialogRef.afterClosed().subscribe(result => {
        this.route.navigate(['/']);
      });
    }, (error) => {
      this.snackbar.open(error.message, "Dismiss", {
        duration: 2000
      })
    })
  }
  onDeleteOption(index) {
    (<FormArray>this.dynamicForm.get('options')).removeAt(index);
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogref: MatDialogRef<DialogElementsExampleDialog>) { }

  onCloseDialog() {
    this.dialogref.close();
  }
}
