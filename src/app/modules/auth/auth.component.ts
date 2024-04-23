import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UserTokenStorageService } from '../../shared/services/user-token-storage.service';
import { Router } from '@angular/router';
import { TextInputComponent } from '../../shared/inputs/text-input/text-input.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    TextInputComponent,
  ],
})
export class AuthComponent {
  authForm: FormGroup;
  authErrorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userTokenStorage: UserTokenStorageService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService,
  ) {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (!this.authForm.valid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.authService
      .login(
        this.authForm.get('username')?.value,
        this.authForm.get('password')?.value,
      )
      .subscribe({
        next: value => {
          this.userTokenStorage.setTokens(value);
          this.router.navigate(['/home/employees']);
        },
        error: err => {
          if (err.status == 403) {
            this.authErrorMessage = 'AUTH_FORM_INVALID_CREDENTIALS';
          } else {
            this.authErrorMessage = 'AUTH_FORM_INTERNAL_SERVER_ERROR';
          }
          // this.cdr.detectChanges();
        },
      });
    this.cdr.detectChanges();
  }

  changeLanguage() {
    const langs = this.translateService.langs;
    const currentLang = this.translateService.currentLang;
    const currentLangIndex = langs.indexOf(currentLang);
    const nextLangIndex =
      currentLangIndex >= 0 && currentLangIndex < langs.length - 1
        ? currentLangIndex + 1
        : 0;
    this.translateService.use(langs[nextLangIndex]);
  }
}
