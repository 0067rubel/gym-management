import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../models/gym.models';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent {
  @Input() member!: Member;
  @Output() addPayment = new EventEmitter<Member>();
  @Output() editMember = new EventEmitter<Member>();
  @Output() deleteMember = new EventEmitter<string>();

  get initials(): string {
    return this.member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
  }

  get badgeClass(): string {
    return `badge-${this.member.status.toLowerCase()}`;
  }

  get typeClass(): string {
    return `type-${this.member.membershipType.toLowerCase()}`;
  }
}
