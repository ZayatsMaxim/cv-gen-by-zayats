import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-cv-employee-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-employee-form.component.html',
  styleUrl: './cv-employee-form.component.scss',
})
export class CvEmployeeFormComponent implements OnInit {
  cvEmployeeForm: FormGroup;

  specializations?: string[];
  departments?: string[];

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cvEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      specialization: ['', Validators.required],
      department: ['', Validators.required],
      skills: [[''], Validators.required],
      languages: this.formBuilder.array([]),
    });

    this.sharedService.getDepartments().subscribe(options => {
      this.departments = options.map(option => option.name);
      this.cdr.detectChanges();
    });

    this.sharedService.getSpecializations().subscribe(options => {
      this.specializations = options.map(option => option.name);
      this.cdr.detectChanges();
    });
  }
}
