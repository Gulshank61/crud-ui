import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeModel } from '../home/home.component';
import { Location } from '@angular/common';



@Component({
  selector: 'app-employee-form',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private httpClient: HttpClient, private location: Location) {
    
    this.employeeForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      age: null,
      designation: [''],
      department: ['']
    });
  }

  mode: 'create' | 'edit' | 'view' = 'create';
  formHeadingText: 'Create Employee' | 'Edit Employee' | 'View Employee' = 'Create Employee';

  isEditMode: boolean = false;
  employeeId: string | null = null;

  employeeData: EmployeeModel = {
    id: null,
    firstName: '',
    lastName: '',
    age: null,
    designation: '',
    department: ''

  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log("Params", params);
      const id = params.get('id');
      // this.isEditMode = this.employeeId !== null;


      if(id){
        this.employeeId = id;
        if(this.route.snapshot.routeConfig?.path?.includes('edit')){
          this.mode = 'edit';
          this.formHeadingText = 'Edit Employee';
        }else if(this.route.snapshot.routeConfig?.path?.includes('view')){
          this.mode = 'view';
          this.formHeadingText = 'View Employee';
          this.employeeForm.disable();
        }

        this.fetchEmployeeData();
      }else{
        this.mode = 'create';
        this.formHeadingText = 'Create Employee';
      }
    });
  }

  fetchEmployeeData() : void {
    this.httpClient.get<{ status: boolean, statusCode: number, message: string, data: EmployeeModel}>(`http://localhost:9090/api/v1/get-employee/${this.employeeId}`).subscribe({
      next: (response) => {
        if(response && response.statusCode == 200){
          this.employeeData = response.data;
          this.setFormValues();
        }else {
          console.error("Unexpected response", response);
        }
      },
      error: (err) => console.error("Error", err)
    });
  }

  setFormValues(): void {
    if(this.employeeForm){
      this.employeeForm.setValue({
        first_name: this.employeeData.firstName,
        last_name: this.employeeData.lastName,
        age: this.employeeData.age,
        designation: this.employeeData.designation,
        department: this.employeeData.department
      })
    }
  }

  onSubmit(): void {
    console.log(this.employeeForm.value)
  }

  onBack() : void {
    this.location.back();
  }

  resetForm() : void {
   this.employeeForm.reset();
  }

}
