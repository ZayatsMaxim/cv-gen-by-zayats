import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ProjectFormComponent } from '../../../../shared/forms/project-form/project-form.component'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
    selector: 'app-project-info',
    standalone: true,
    imports: [CommonModule, ProjectFormComponent, ReactiveFormsModule],
    templateUrl: './project-info.component.html',
    styleUrl: './project-info.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInfoComponent implements OnInit {
    projectForm!: FormGroup

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.projectForm = this.formBuilder.group({
            project: {},
        })
    }
}
