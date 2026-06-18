import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GenearteBillsComponent } from './genearte-bills/genearte-bills.component';

const routes: Routes = [
   {
    path: '',
    component: LoginComponent,
  },
  { path: '**', redirectTo: 'login' },
  {path:'menu', component : GenearteBillsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
