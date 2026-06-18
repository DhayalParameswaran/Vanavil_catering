import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GenearteBillsComponent } from './genearte-bills/genearte-bills.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GenearteBillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
