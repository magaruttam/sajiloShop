import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthStore } from '../../../../core/store/auth.store';

@Component({
  selector: 'app-vendor-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './vendor-register.html',
  styleUrl: './vendor-register.scss',
})
export class VendorRegister {
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  showPassword = signal(false);
  loading = signal(false);
  errorMessage = signal('');

  form = new FormGroup({
    shopName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((c) => c.markAsTouched());
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const { shopName, email, password } = this.form.value;

    this.authService
      .register({ name: '',shopName: shopName!, email: email!, password: password!, role: 'vendor' })
      .subscribe({
        next: (res) => {
          this.authStore.login(res.user.name, res.user.email);
          this.loading.set(false);
          this.router.navigate(['/vendor/overview']);
        },
        error: (err) => {
          this.loading.set(false);
          this.errorMessage.set(err.error?.message ?? 'Registration failed. Please try again.');
        },
      });
  }
}
