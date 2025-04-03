import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>

    <div class="container mt-5">
      <h2 class="text-center mb-4">Hospital Visitor Entry</h2>
    
      <form [formGroup]="visitorForm" (ngSubmit)="submitForm()" class="p-4 border rounded shadow bg-light">
        <div class="mb-3">
          <label class="form-label">Name:</label>
          <input type="text" class="form-control" formControlName="name" required>
        </div>
    
        <div class="mb-3">
          <label class="form-label">Contact:</label>
          <input type="text" class="form-control" formControlName="contact" required>
        </div>
    
        <div class="mb-3">
          <label class="form-label">Purpose of Visit:</label>
          <input type="text" class="form-control" formControlName="purpose" required>
        </div>
    
        <div class="mb-3">
          <label class="form-label">Date:</label>
          <input type="date" class="form-control" formControlName="date" required>
        </div>
    
        <button type="submit" class="btn btn-primary w-100" [disabled]="!visitorForm.valid">Submit</button>
      </form>
    
      <h3 class="text-center mt-5">Visitor Log</h3>
    
      <div class="table-responsive">
        <table class="table table-striped table-bordered mt-3">
          <thead class="table-dark">
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Purpose</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let visitor of visitors">
              <td>{{ visitor.name }}</td>
              <td>{{ visitor.contact }}</td>
              <td>{{ visitor.purpose }}</td>
              <td>{{ visitor.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  `,
})
export class App {
  name = 'Angular';
  visitorForm: FormGroup;
  visitors: any[] = [];

  constructor(private fb: FormBuilder) {
    this.visitorForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      purpose: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  submitForm() {
    if (this.visitorForm.valid) {
      this.visitors.push(this.visitorForm.value);
      this.visitorForm.reset({ date: new Date().toISOString().split('T')[0] });
    }
  }
}

bootstrapApplication(App);