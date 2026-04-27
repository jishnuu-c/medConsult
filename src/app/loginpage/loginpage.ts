import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.css',
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Fake login check
      if (username === 'Admin User' && password === '123456') {
        this.errorMsg = '';
        this.router.navigate(['/success']);
      } else {
        this.errorMsg = 'Invalid username or password ❌';
      }
    }
  }
}