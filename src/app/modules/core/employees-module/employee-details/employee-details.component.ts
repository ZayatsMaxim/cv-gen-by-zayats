import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { TranslateModule } from '@ngx-translate/core'
import { SharedService } from '../../../../shared/services/shared.service'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'

@Component({
    selector: 'app-employee-details',
    standalone: true,
    imports: [
        CommonModule,
        MatInputModule,
        TranslateModule,
        ReactiveFormsModule,
        MatSelectModule,
    ],
    templateUrl: './employee-details.component.html',
    styleUrl: './employee-details.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent implements OnInit {
    employeeForm!: FormGroup

    specializations?: string[]
    departments?: string[]

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService,
    ) {}

    ngOnInit(): void {
        this.employeeForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            specialization: ['', Validators.required],
            department: ['', Validators.required],
        })

        this.sharedService.getDepartments().subscribe(options => {
            this.departments = options.map(option => option.name)
        })

        this.sharedService.getSpecializations().subscribe(options => {
            this.specializations = options.map(option => option.name)
        })
    }
}
