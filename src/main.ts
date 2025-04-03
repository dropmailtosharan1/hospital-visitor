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

    <div class="container">
      <h2>Hospital Visitor Entry</h2>
      <form [formGroup]="visitorForm" (ngSubmit)="submitForm()">
        <label>Name:</label>
        <input formControlName="name" required>
        
        <label>Contact:</label>
        <input formControlName="contact" required>
        
        <label>Purpose of Visit:</label>
        <input formControlName="purpose" required>
        
        <label>Date:</label>
        <input type="date" formControlName="date" required>
        
        <button type="submit" [disabled]="!visitorForm.valid">Submit</button>
      </form>
      
      <h3>Visitor Log</h3>
      <table>
        <tr><th>Name</th><th>Contact</th><th>Purpose</th><th>Date</th></tr>
        <tr *ngFor="let visitor of visitors">
          <td>{{ visitor.name }}</td>
          <td>{{ visitor.contact }}</td>
          <td>{{ visitor.purpose }}</td>
          <td>{{ visitor.date }}</td>
        </tr>
      </table>
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