import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { JournalEntry } from '@app/data/models/journal-entry';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  @Input() journalEntries: JournalEntry[];
  @Input() title: string;

  lineChart: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.lineChartMethod();
  }

  lineChartMethod() {
    const labels = [];
    const data = [];

    for (let i = 0; i < 7; i++) {
      labels.push(this.journalEntries[i].date.getDate() + '.' + (this.journalEntries[i].date.getMonth() + 1) + '.');
      data.push(this.journalEntries[i].score);
    }

    labels.reverse();
    data.reverse();

    Chart.register(...registerables);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      options: {
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          y: {
            ticks: {
              stepSize: 1,
              padding: 8
            }
          }
        }
      },
      data: {
        labels,
        datasets: [
          {
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data,
            spanGaps: false,
          }
        ]
      }
    });
  }

}
