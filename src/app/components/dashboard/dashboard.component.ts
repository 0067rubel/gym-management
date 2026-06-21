import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Member, Payment } from '../../models/gym.models';
import { GymService } from '../../services/gym.service';
import { AuthService } from '../../services/auth.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { MemberRegistrationComponent } from '../member-registration/member-registration.component';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { ChartsComponent } from '../charts/charts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MemberCardComponent, MemberRegistrationComponent, PaymentModalComponent, ChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  members: Member[] = [];
  searchQuery = '';
  filterType = '';
  filterStatus = '';

  showRegistration = false;
  editingMember: Member | null = null;
  paymentMember: Member | null = null;
  activeTab: 'members' | 'charts' = 'members';

  membersByType: { [k: string]: number } = {};
  monthlyRevenue: { month: string; revenue: number }[] = [];

  constructor(private gymService: GymService, public authService: AuthService) {}

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.members = this.gymService.getMembers();
    this.membersByType = this.gymService.getMembersByType();
    this.monthlyRevenue = this.gymService.getMonthlyRevenue();
  }

  get filteredMembers(): Member[] {
    return this.members.filter(m => {
      const q = this.searchQuery.toLowerCase();
      const matchSearch = !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.phone.includes(q);
      const matchType = !this.filterType || m.membershipType === this.filterType;
      const matchStatus = !this.filterStatus || m.status === this.filterStatus;
      return matchSearch && matchType && matchStatus;
    });
  }

  get stats() {
    const all = this.members;
    return {
      total: all.length,
      active: all.filter(m => m.status === 'Active').length,
      revenue: this.gymService.getPayments().reduce((s, p) => s + p.amount, 0),
      newThisMonth: all.filter(m => m.joinDate.startsWith(new Date().toISOString().slice(0,7))).length
    };
  }

  onSaveMember(data: Omit<Member, 'id'>): void {
    if (this.editingMember) {
      this.gymService.updateMember(this.editingMember.id, data);
    } else {
      this.gymService.addMember(data);
    }
    this.showRegistration = false;
    this.editingMember = null;
    this.loadData();
  }

  onEditMember(member: Member): void {
    this.editingMember = member;
    this.showRegistration = true;
  }

  onDeleteMember(id: string): void {
    if (confirm('Are you sure you want to delete this member?')) {
      this.gymService.deleteMember(id);
      this.loadData();
    }
  }

  onAddPayment(member: Member): void { this.paymentMember = member; }

  getPayments(memberId: string): Payment[] {
    return this.gymService.getPaymentsByMember(memberId);
  }

  onSavePayment(data: Omit<Payment, 'id'>): void {
    this.gymService.addPayment(data);
    this.paymentMember = null;
    this.loadData();
  }

  cancelRegistration(): void {
    this.showRegistration = false;
    this.editingMember = null;
  }
}
