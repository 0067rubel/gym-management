import { Injectable } from '@angular/core';
import { Member, Payment, MonthlyRevenue } from '../models/gym.models';

@Injectable({ providedIn: 'root' })
export class GymService {
  private members: Member[] = [
    { id: 'm1', name: 'Arif Rahman', email: 'arif@email.com', phone: '017-11111111', dob: '1990-05-15', joinDate: '2024-01-10', membershipType: 'Premium', status: 'Active', services: ['Pool', 'Gym', 'Yoga'] },
    { id: 'm2', name: 'Sadia Islam', email: 'sadia@email.com', phone: '018-22222222', dob: '1995-08-22', joinDate: '2024-02-01', membershipType: 'Basic', status: 'Active', services: ['Gym'] },
    { id: 'm3', name: 'Tanvir Hossain', email: 'tanvir@email.com', phone: '019-33333333', dob: '1988-03-10', joinDate: '2024-02-15', membershipType: 'VIP', status: 'Active', services: ['Pool', 'Gym', 'Yoga', 'Sauna'] },
    { id: 'm4', name: 'Nusrat Jahan', email: 'nusrat@email.com', phone: '017-44444444', dob: '1993-11-30', joinDate: '2024-03-01', membershipType: 'Standard', status: 'Inactive', services: ['Gym', 'Yoga'] },
    { id: 'm5', name: 'Karim Uddin', email: 'karim@email.com', phone: '018-55555555', dob: '1985-07-19', joinDate: '2024-03-20', membershipType: 'Basic', status: 'Active', services: ['Gym'] },
    { id: 'm6', name: 'Rima Akter', email: 'rima@email.com', phone: '019-66666666', dob: '1998-01-25', joinDate: '2024-04-05', membershipType: 'Premium', status: 'Active', services: ['Pool', 'Gym'] },
    { id: 'm7', name: 'Farhan Kabir', email: 'farhan@email.com', phone: '017-77777777', dob: '1991-09-14', joinDate: '2024-04-18', membershipType: 'Standard', status: 'Suspended', services: ['Gym', 'Yoga'] },
    { id: 'm8', name: 'Mim Chowdhury', email: 'mim@email.com', phone: '018-88888888', dob: '1997-12-05', joinDate: '2024-05-01', membershipType: 'VIP', status: 'Active', services: ['Pool', 'Gym', 'Yoga', 'Sauna', 'Personal Training'] },
  ];

  private payments: Payment[] = [
    { id: 'p1', memberId: 'm1', amount: 3500, paymentDate: '2024-01-10', paymentMethod: 'Card', membershipPeriod: 'Jan 2024' },
    { id: 'p2', memberId: 'm2', amount: 1500, paymentDate: '2024-02-01', paymentMethod: 'Cash', membershipPeriod: 'Feb 2024' },
    { id: 'p3', memberId: 'm3', amount: 6000, paymentDate: '2024-02-15', paymentMethod: 'Online', membershipPeriod: 'Feb 2024' },
    { id: 'p4', memberId: 'm1', amount: 3500, paymentDate: '2024-02-10', paymentMethod: 'Card', membershipPeriod: 'Feb 2024' },
    { id: 'p5', memberId: 'm4', amount: 2500, paymentDate: '2024-03-01', paymentMethod: 'Bank Transfer', membershipPeriod: 'Mar 2024' },
    { id: 'p6', memberId: 'm5', amount: 1500, paymentDate: '2024-03-20', paymentMethod: 'Cash', membershipPeriod: 'Mar 2024' },
    { id: 'p7', memberId: 'm3', amount: 6000, paymentDate: '2024-03-15', paymentMethod: 'Online', membershipPeriod: 'Mar 2024' },
    { id: 'p8', memberId: 'm6', amount: 3500, paymentDate: '2024-04-05', paymentMethod: 'Card', membershipPeriod: 'Apr 2024' },
    { id: 'p9', memberId: 'm7', amount: 2500, paymentDate: '2024-04-18', paymentMethod: 'Cash', membershipPeriod: 'Apr 2024' },
    { id: 'p10', memberId: 'm1', amount: 3500, paymentDate: '2024-04-10', paymentMethod: 'Card', membershipPeriod: 'Apr 2024' },
    { id: 'p11', memberId: 'm8', amount: 8000, paymentDate: '2024-05-01', paymentMethod: 'Online', membershipPeriod: 'May 2024' },
    { id: 'p12', memberId: 'm5', amount: 1500, paymentDate: '2024-05-20', paymentMethod: 'Cash', membershipPeriod: 'May 2024' },
    { id: 'p13', memberId: 'm6', amount: 3500, paymentDate: '2024-05-05', paymentMethod: 'Card', membershipPeriod: 'May 2024' },
    { id: 'p14', memberId: 'm3', amount: 6000, paymentDate: '2024-06-15', paymentMethod: 'Online', membershipPeriod: 'Jun 2024' },
    { id: 'p15', memberId: 'm8', amount: 8000, paymentDate: '2024-06-01', paymentMethod: 'Online', membershipPeriod: 'Jun 2024' },
  ];

  // MEMBER CRUD
  getMembers(): Member[] { return [...this.members]; }

  getMemberById(id: string): Member | undefined {
    return this.members.find(m => m.id === id);
  }

  addMember(member: Omit<Member, 'id'>): Member {
    const newMember = { ...member, id: 'm' + Date.now() };
    this.members.push(newMember);
    return newMember;
  }

  updateMember(id: string, updates: Partial<Member>): Member | null {
    const idx = this.members.findIndex(m => m.id === id);
    if (idx === -1) return null;
    this.members[idx] = { ...this.members[idx], ...updates };
    return this.members[idx];
  }

  deleteMember(id: string): boolean {
    const idx = this.members.findIndex(m => m.id === id);
    if (idx === -1) return false;
    this.members.splice(idx, 1);
    return true;
  }

  // PAYMENT CRUD
  getPayments(): Payment[] { return [...this.payments]; }

  getPaymentsByMember(memberId: string): Payment[] {
    return this.payments.filter(p => p.memberId === memberId);
  }

  addPayment(payment: Omit<Payment, 'id'>): Payment {
    const newPayment = { ...payment, id: 'p' + Date.now() };
    this.payments.push(newPayment);
    return newPayment;
  }

  updatePayment(id: string, updates: Partial<Payment>): Payment | null {
    const idx = this.payments.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.payments[idx] = { ...this.payments[idx], ...updates };
    return this.payments[idx];
  }

  deletePayment(id: string): boolean {
    const idx = this.payments.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.payments.splice(idx, 1);
    return true;
  }

  // CHART DATA
  getMembersByType(): { [key: string]: number } {
    return this.members.reduce((acc, m) => {
      acc[m.membershipType] = (acc[m.membershipType] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  getMonthlyRevenue(): MonthlyRevenue[] {
    const revenueMap: { [key: string]: number } = {};
    this.payments.forEach(p => {
      const month = p.paymentDate.substring(0, 7);
      revenueMap[month] = (revenueMap[month] || 0) + p.amount;
    });
    return Object.entries(revenueMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, revenue]) => ({
        month: new Date(month + '-01').toLocaleString('default', { month: 'short', year: 'numeric' }),
        revenue
      }));
  }
}
