import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor';

@Component({
  selector: 'app-drschedul',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './drschedul.html',
  styleUrls: ['./drschedul.css'],
})
export class Drschedul implements OnInit {
  doctor: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {
    
  }
  doctorId!: string;

 ngOnInit(): void {
  this.doctorId = this.route.snapshot.paramMap.get('id')!;

  if (!this.doctorId) return;

  this.doctorService.getscheduleById(this.doctorId).subscribe({
    next: (res) => {
      this.doctor = Array.isArray(res) ? res : [res];
      this.cd.detectChanges();
    },
    error: (err) => console.error(err),
  });
}
goToAddSchedule() {
  this.router.navigate(['/addschedule', this.doctorId]);
}
}
