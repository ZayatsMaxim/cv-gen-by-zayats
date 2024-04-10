import { CommonModule } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    OnInit,
} from '@angular/core'
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NG_VALUE_ACCESSOR,
    Validators,
} from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
    selector: 'app-project-form',
    standalone: true,
    imports: [CommonModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './project-form.component.html',
    styleUrl: './project-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ProjectFormComponent),
            multi: true,
        },
    ],
})
export class ProjectFormComponent implements ControlValueAccessor, OnInit {
    projectForm!: FormGroup
    public onTouched: () => void = () => {}

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.projectForm = this.formBuilder.group({
            projectName: ['', Validators.required],
            description: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            teamSize: [0, Validators.required],
            techStack: [[], Validators.required],
            responsibilities: [[], Validators.required],
            teamRoles: [[], Validators.required],
        })
    }

    writeValue(obj: { [key: string]: unknown }): void {
        obj && this.projectForm.setValue(obj)
    }

    registerOnChange(fn: any): void {
        this.projectForm.valueChanges.subscribe(fn)
    }

    registerOnTouched(fn: any): void {
        console.log(fn)
        this.onTouched = fn
    }
}
