import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Member } from '../../models/gym.models';

@Component({
  selector: 'app-member-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.scss']
})
export class MemberRegistrationComponent implements OnChanges {
  @Input() editMember: Member | null = null;
  @Output() save = new EventEmitter<Omit<Member, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  form: Omit<Member, 'id'> = this.defaultForm();
  availableServices = ['Gym', 'Pool', 'Yoga', 'Sauna', 'Personal Training', 'Cardio Zone', 'Crossfit'];
  membershipTypes = ['Basic', 'Standard', 'Premium', 'VIP'];
  statusOptions = ['Active', 'Inactive', 'Suspended'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editMember'] && this.editMember) {
      this.form = { ...this.editMember };
    } else if (changes['editMember'] && !this.editMember) {
      this.form = this.defaultForm();
    }
  }

  defaultForm(): Omit<Member, 'id'> {
    return { name: '', email: '', phone: '', dob: '', joinDate: new Date().toISOString().slice(0,10), membershipType: 'Basic', status: 'Active', services: [] };
  }

  toggleService(service: string): void {
    const idx = this.form.services.indexOf(service);
    if (idx > -1) this.form.services.splice(idx, 1);
    else this.form.services.push(service);
  }

  isSelected(service: string): boolean {
    return this.form.services.includes(service);
  }

  onSubmit(): void {
    this.save.emit({ ...this.form });
    this.form = this.defaultForm();
  }
}
