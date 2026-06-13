import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthStore } from '../../../../core/store/auth.store';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  showPassword = signal(false);
  loading = signal(false);
  errorMessage = signal('');

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
  });

  
  onSubmit() {
    console.log('Form submitted');
    console.log('Form valid:', this.form.valid);
    console.log('Form value:', this.form.value);
    
    // Mark all fields as touched to show validation errors
    if (this.form.invalid) {
      console.log('Form is invalid, not submitting');
      console.log('Form errors:', this.form.errors);
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
        if (control?.invalid) {
          console.log(`${key} errors:`, control.errors);
        }
      });
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const { name, email, password } = this.form.value;

    console.log('Calling register API with:', { name, email, password, role: 'user' });

    this.authService
      .register({ 
        name: name!, 
        email: email!, 
        password: password!,
        role: 'user' 
      })
      .subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.authStore.login(response.user.name, response.user.email);
          this.loading.set(false);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.loading.set(false);
          
          let errorMessage = 'Registration failed. Please try again.';
          
          if (err.status === 0) {
            errorMessage = 'Cannot connect to server. Please check if the backend is running on http://localhost:8000';
          } else if (err.error?.message) {
            errorMessage = err.error.message;
            
            // If there are specific validation errors, show them
            if (err.error.errors && Array.isArray(err.error.errors)) {
              const validationErrors = err.error.errors.map((error: any) => error.message || error).join(', ');
              errorMessage = `${err.error.message}: ${validationErrors}`;
            }
          }
          
          console.log('Formatted error message:', errorMessage);
          this.errorMessage.set(errorMessage);
        },
      });
  }
}
