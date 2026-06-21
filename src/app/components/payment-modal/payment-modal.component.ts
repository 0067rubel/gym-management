import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Member, Payment } from '../../models/gym.models';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent {
  @Input() member!: Member;
  @Input() existingPayments: Payment[] = [];
  @Output() save = new EventEmitter<Omit<Payment, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  form = {
    amount: 0,
    paymentDate: new Date().toISOString().slice(0,10),
    paymentMethod: 'Card' as Payment['paymentMethod'],
    membershipPeriod: ''
  };
  paymentMethods: Payment['paymentMethod'][] = ['Cash', 'Card', 'Online', 'Bank Transfer'];

  get totalPaid(): number {
    return this.existingPayments.reduce((s, p) => s + p.amount, 0);
  }

  onSubmit(): void {
    this.save.emit({ ...this.form, memberId: this.member.id });
    this.form = { amount: 0, paymentDate: new Date().toISOString().slice(0,10), paymentMethod: 'Card', membershipPeriod: '' };
  }
}
