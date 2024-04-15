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
import { TranslateModule } from '@ngx-translate/core'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

@Component({
    selector: 'app-project-form',
    standalone: true,
    imports: [
        CommonModule,
        MatInputModule,
        ReactiveFormsModule,
        TranslateModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    templateUrl: './project-form.component.html',
    styleUrl: './project-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        MatDatepickerModule,
        MatNativeDateModule,
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

    //todo: get from API
    roles: string[] = ['test1', 'test2']
    techs: string[] = ['test3', 'test4']
    responsibilities: string[] = ['test5', 'test6']

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.projectForm = this.formBuilder.group({
            projectName: ['', Validators.required],
            description: ['', Validators.required],
            startDate: [new Date(), Validators.required],
            endDate: [new Date(), Validators.required],
            teamSize: [0, Validators.required],
            techStack: [[''], Validators.required],
            responsibilities: [[''], Validators.required],
            teamRoles: [[''], Validators.required],
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
