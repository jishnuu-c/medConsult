import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../services/doctor';

@Component({
  selector: 'app-schedul',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './schedul.html',
  styleUrls: ['./schedul.css'],
})
export class Schedul implements OnInit {
  doctor: any[] = [];
  doctorId!: string;

  // 🔥 Booking popup
  showBookingForm = false;
  showSuccessPopup = false;
  bookedSchedules: any[] = [];          //ipo//
  selectedSchedule: any;

  // 🔥 Form
  bookingForm!: FormGroup;

  // ⚠️ Replace later with logged-in user
  patientId = '75d2c2f6-2faa-46c0-b7c5-ee9647e44b53';

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // ✅ get doctor id
    this.doctorId = this.route.snapshot.paramMap.get('id')!;

    // ✅ fetch schedules
    if (this.doctorId) {
      this.doctorService.getscheduleById(this.doctorId).subscribe({
        next: (res: any) => {
          console.log('drshedule:',res)
          this.doctor = Array.isArray(res) ? res : [res];
          this.cd.detectChanges();
        },
        error: (err) => console.error(err),
      });
    }

    // ✅ init booking form
    this.bookingForm = this.fb.group({
      location: ['', Validators.required],
      appointmentType: ['', Validators.required],
      scheduledAt: ['', Validators.required],
       notes: ['', Validators.required] 
    });
  }

  // 🔥 open popup
  openBooking(schedule: any) {
    console.log('popup:',schedule)
    this.selectedSchedule = schedule;
    this.showBookingForm = true;
    this.bookingForm.reset();
  }

  // 🔥 close popup
  closeBooking() {
    this.showBookingForm = false;
  }

  // 🔥 submit booking
  submitBooking() {
    console.log('click conform',this.submitBooking)
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;       
    }

     const formValue = this.bookingForm.value;

  // console.log(formValue); // 👈 check this first

  // Fix datetime format
  let scheduledAt = formValue.scheduledAt;

  if (!scheduledAt) {
    console.error('ScheduledAt is NULL ❌');
    return;
  }

  



    const formattedDate = new Date(scheduledAt).toISOString();

  const payload = {
    location: formValue.location,
    appointmentType: formValue.appointmentType,
    scheduledAt: formattedDate,
    notes: formValue.notes,
  };
    console.log("🔥 Sending payload:", payload);

    this.doctorService.bookConsultation(this.doctorId, this.patientId, payload).subscribe({
      next: (res) => {
        console.log('Booking successful', res);
        // ✅ move UI updates here (AFTER success)
        this.bookedSchedules.push(this.selectedSchedule);
        this.showBookingForm = false;
        this.showSuccessPopup = true;
        this.bookingForm.reset();
        this.closeBooking();
      },
      error: (err) => console.error('Booking failed', err),
    });
  }

  // navigation (optional)
  goToSchedule() {
    this.router.navigate(['/schedule']);
  }
}
