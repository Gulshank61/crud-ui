import { NgStyle } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

export interface EmployeeModel{
  id: number | null,
  firstName: string,
  lastName:string,
  age: number | null,
  designation:string,
  department:string
}

const DUMMY_DATA: EmployeeModel[] = [
  {id: 1, firstName: "Employee", lastName: "One", age: 23, designation:"Developer", department:"IT"},
  {id: 2, firstName: "Employee", lastName: "Two", age: 23, designation:"Developer", department:"IT"},
  {id: 3, firstName: "Employee", lastName: "Three", age: 23, designation:"Developer", department:"IT"},
  {id: 4, firstName: "Employee", lastName: "Four", age: 23, designation:"Developer", department:"IT"},
  {id: 5, firstName: "Employee", lastName: "Five", age: 23, designation:"Developer", department:"IT"},
];

@Component({
  selector: 'app-home',
  imports: [MatTableModule, MatIconButton, MatIcon, NgStyle, MatPaginatorModule, MatFabButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private httpClient: HttpClient) {}
  dialog = inject(MatDialog);


  displayedColumns:string[] = ['id', 'name', 'age', 'designation', 'department', 'action'];
  dataSource = DUMMY_DATA;

  apiUrl:string = "http://localhost:9090/api/v1/get-employees";

  ngOnInit(): void {
    this.fetchEmployeeData();
  }

  fetchEmployeeData(): void {
    this.httpClient.get<{ status: boolean, statusCode: number, message: string, data: EmployeeModel[]}>(this.apiUrl).subscribe({
      next: (response) => {
        if(response.status && response.statusCode == 200){
          this.dataSource = response.data;
        }else{
          console.error('Unexpected response', response);
        }
      },
      error: (err) => console.error('Error fetching employees data', err)
    });
  }

  navigateTo(path: string) : void {
    this.router.navigateByUrl(path);
  }

  deleteEmployee(id: number | null): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        first_name: 'Hello'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
    });
  }
}
