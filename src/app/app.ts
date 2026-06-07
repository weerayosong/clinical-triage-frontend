import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // สำหรับทำ Two-way binding กับฟอร์ม
import { PatientService } from './services/patient';
import { Patient } from './models/patient.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  // --- Data State ---
  patientsList: Patient[] = [];

  // ตัวแปรสำหรับรับค่าจากฟอร์ม
  newPatient: Patient = {
    name: '',
    symptoms: '',
    urgency: 'NORMAL', // ตั้งค่าเริ่มต้นให้ตรงกับ Enum default = normal
  };

  // --- UI State ---
  currentTime: string = '00:00';
  activeMobileTab: string = 'WAITING';
  isDesktop: boolean = window.innerWidth >= 1024;

  // Toast State
  toastMessage: string = '';
  showToast: boolean = false;

  constructor(
    private patientService: PatientService,
    private cdr: ChangeDetectorRef,
  ) {
    setInterval(() => {
      this.updateClock();
      this.cdr.detectChanges();
    }, 60000);
    this.updateClock();
  }

  ngOnInit() {
    this.loadPatients(); // โหลดข้อมูลทันทีที่เปิดหน้าเว็บ
  }

  // จับ Event ตอนย่อ/ขยายหน้าจอเพื่อปรับ Layout
  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth >= 1024;
  }

  updateClock() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // --- API Integrations ---
  loadPatients() {
    this.patientService.getAllPatients().subscribe({
      next: (data) => {
        this.patientsList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading patients:', err),
    });
  }

  submitForm() {
    if (!this.newPatient.name || !this.newPatient.symptoms) return;

    this.patientService.registerPatient(this.newPatient).subscribe({
      next: (savedPatient) => {
        this.patientsList.push(savedPatient); // อัปเดต UI ทันที
        this.displayToast(`${savedPatient.name} added to queue.`);

        // เคลียร์ฟอร์ม
        this.newPatient = { name: '', symptoms: '', urgency: 'NORMAL' };

        if (!this.isDesktop && this.activeMobileTab !== 'WAITING') {
          this.activeMobileTab = 'WAITING';
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error registering:', err),
    });
  }

  updatePatientStatus(id: number | undefined, newStatus: string) {
    if (!id) return;

    // optimistic opdate
    const index = this.patientsList.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.patientsList[index].status = newStatus as any; // แก้ค่า status ไปเลย
      if (!this.isDesktop) this.activeMobileTab = newStatus;
      this.cdr.detectChanges(); // วาดหน้าจอใหม่ทันที ไม่ต้องรอ API!
    }

    this.patientService.updateStatus(id, newStatus).subscribe({
      next: () => {
        this.displayToast(`Moved to ${newStatus.replace('_', ' ')}.`);
      },
      error: (err) => console.error('Error updating status:', err),
    });
  }

  deleteCase(id: number | undefined) {
    if (!id) return;

    if (confirm('Are you sure you want to delete this case? This action cannot be undone.')) {
      // อัปเดต UI ทันที เตะออกจาก Array แล้ววาดจอใหม่
      this.patientsList = this.patientsList.filter((p) => p.id !== id);
      this.cdr.detectChanges();

      // ส่งคำสั่งลบไปหา Spring Boot
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          this.displayToast('Case deleted successfully.');
        },
        error: (err) => console.error('Error deleting patient:', err),
      });
    }
  }

  // --- Getters สำหรับแยกกลุ่มข้อมูล ---
  get waitingPatients() {
    return this.patientsList.filter((p) => p.status === 'WAITING');
  }
  get treatmentPatients() {
    return this.patientsList.filter((p) => p.status === 'IN_TREATMENT');
  }
  get dischargedPatients() {
    return this.patientsList.filter((p) => p.status === 'DISCHARGED');
  }

  // --- UI Helpers ---
  toggleAccordion(tab: string) {
    if (this.isDesktop) return;
    this.activeMobileTab = tab;
  }

  displayToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000);
  }
}
