import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthStore } from '../../../../core/store/auth.store';

@Component({
  selector: 'app-vendor-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './vendor-login.html',
  styleUrl: './vendor-login.scss',
})
export class VendorLogin {
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  showPassword = signal(false);
  loading = signal(false);
  errorMessage = signal('');

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false),
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.errorMessage.set('');

    const { email, password } = this.form.value;

    this.authService.vendorLogin({ email: email!, password: password! }).subscribe({
      next: (res) => {
        const vendor = res.vendor
          ? {
              id: res.vendor.id,
              userId: res.vendor.userId,
              status: res.vendor.status,
              shopName: res.vendor.shopName,
              balance: res.vendor.balance,
            }
          : null;
        this.authStore.vendorLogin(res.user.name, res.user.email, vendor);
        this.loading.set(false);
        this.router.navigate(['/vendor/overview']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.message ?? 'Login failed. Please try again.');
      },
    });
  }
}
