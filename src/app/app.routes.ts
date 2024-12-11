import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

export const routes: Routes = [
    { path: "header", component: HeaderComponent},
    {path: "", component: HomeComponent},
    {path: "employee/create", component: EmployeeFormComponent},
    {path: "employee/edit/:id", component: EmployeeFormComponent},
    {path: "employee/view/:id", component: EmployeeFormComponent}
];
