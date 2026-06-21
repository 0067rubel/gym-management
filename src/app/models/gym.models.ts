export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  joinDate: string;
  membershipType: 'Basic' | 'Standard' | 'Premium' | 'VIP';
  status: 'Active' | 'Inactive' | 'Suspended';
  services: string[];
}

export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'Cash' | 'Card' | 'Online' | 'Bank Transfer';
  membershipPeriod: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}
