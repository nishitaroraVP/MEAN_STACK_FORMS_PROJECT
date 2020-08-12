import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from   '../app/app.component'
import {FormListComponent} from './form-list/form-list.component';
import {FormEditComponent} from './form-list/form-edit/form-edit.component';
import {FormComponent} from './form-list/form/form.component';
const routes: Routes = [
  
  {path:'forms',component:FormListComponent},
    
    {path:'forms/:slug/view',component:FormComponent},

    
  
  {path:'forms/create',component:FormEditComponent},
  {path:'**',redirectTo:'/forms'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
