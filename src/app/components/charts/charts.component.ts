import { Component, Input, OnChanges, AfterViewInit, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements AfterViewInit, OnChanges {
  @Input() membersByType: { [key: string]: number } = {};
  @Input() monthlyRevenue: { month: string; revenue: number }[] = [];

  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineCanvas') lineCanvas!: ElementRef<HTMLCanvasElement>;

  private barChart?: Chart;
  private lineChart?: Chart;
  private initialized = false;

  ngAfterViewInit(): void {
    this.initialized = true;
    this.buildCharts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized) this.buildCharts();
  }

  buildCharts(): void {
    this.buildBar();
    this.buildLine();
  }

  buildBar(): void {
    if (!this.barCanvas) return;
    this.barChart?.destroy();
    const labels = Object.keys(this.membersByType);
    const data = Object.values(this.membersByType);
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Members',
          data,
          backgroundColor: ['#f97316','#3b82f6','#8b5cf6','#10b981'],
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f1f5f9' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  buildLine(): void {
    if (!this.lineCanvas) return;
    this.lineChart?.destroy();
    const labels = this.monthlyRevenue.map(r => r.month);
    const data = this.monthlyRevenue.map(r => r.revenue);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Revenue (৳)',
          data,
          borderColor: '#f97316',
          backgroundColor: 'rgba(249,115,22,0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#f97316',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}
