import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormListComponent } from './form-list/form-list.component';
import { FormEditComponent } from './form-list/form-edit/form-edit.component';
import { FormComponent } from './form-list/form/form.component';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormViewComponent } from './form-list/form/form-view/form-view.component';
import { FormResponsesComponent } from './form-list/form/form-responses/form-responses.component';
@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    FormEditComponent,
    FormComponent,
    FormViewComponent,
    FormResponsesComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
