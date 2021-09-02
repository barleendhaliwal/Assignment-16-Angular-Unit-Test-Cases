import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RowComponent } from './table/row/row.component';

import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerRowComponent } from './customers/customer-row/customer-row.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatCardModule} from '@angular/material/card'
import {MatTableModule} from '@angular/material/table'
import {MatExpansionModule} from '@angular/material/expansion';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { UsersComponent } from './users/users.component';



const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'showUsers', component: UsersComponent },
  { path: 'addUser', component: AddComponent },
  { path: 'customers', component:CustomersComponent},
  { path: 'addCustomer', component:AddCustomerComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    RowComponent,
    HomeComponent,
    AddComponent,
    CustomersComponent,
    CustomerRowComponent,
    AddCustomerComponent,
    UsersComponent,
   
   

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
     RouterModule.forRoot(appRoutes),
     BrowserAnimationsModule,
     MatCardModule,
     MatTableModule,
     MatExpansionModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
