import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
    authForm: FormGroup

    constructor(private formBuilder: FormBuilder) {
        this.authForm = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        })
    }

    submit() {
        this.authForm.markAllAsTouched()
    }
}
