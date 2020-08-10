import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormListComponent } from './form-list/form-list.component';
import { FormEditComponent } from './form-list/form-edit/form-edit.component';
import { FormComponent } from './form-list/form/form.component';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    FormEditComponent,
    FormComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
