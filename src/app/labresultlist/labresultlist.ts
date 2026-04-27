import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../services/doctor';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-labresultlist',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './labresultlist.html',
  styleUrl: './labresultlist.css',
})
export class Labresultlist {

  labResults: any[] = [];
  selectedResult: any = null;
  showModal = false;

  constructor(private labService:DoctorService,
              private cd: ChangeDetectorRef,
              private route: ActivatedRoute
   ) {}
   ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');

    console.log("Patient ID:", patientId); // debug

    if (patientId) {
      this.loadResults(patientId);
    }
  }

  loadResults(patientId: string) {
    this.labService.getLabResults(patientId)
      .subscribe((res) => {
        console.log('this is',res)
        this.labResults = res;
        this.cd.detectChanges();
      });
  }
  
  

  loading = false;

openDetails(result: any) {
  this.loading = true;
  this.showModal = true;

  this.labService.getLabResultDetails(result.labResultId)
    .subscribe((res) => {
      this.selectedResult = res;
      this.loading = false;
    });
}

  closeModal() {
    this.showModal = false;
  }
}

