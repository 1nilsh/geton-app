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
  @Input() score: string;

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

    let journalEntryIndex = 0;
    for (let i = 0; i < 7; i++) {
      const day = new Date(Date.now() - i * 864e5);
      labels.push(day.getDate() + '.' + (day.getMonth() + 1) + '.');

      if (this.journalEntries[journalEntryIndex] !== undefined) {
        let scoreSum = 0;
        let scoreCount = 0;
        while (this.areDatesOnSameDay(this.journalEntries[journalEntryIndex].date, day)) {
          scoreSum += this.journalEntries[journalEntryIndex][this.score];
          scoreCount++;
          journalEntryIndex++;
        }

        if (scoreCount > 0) {
          data.push(scoreSum / scoreCount);
        } else {
          data.push(0);
        }

        scoreSum = 0;
        scoreCount = 0;
      } else {
        data.push(0);
      }
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

  private areDatesOnSameDay(date1: Date, date2: Date): boolean {
    if (date1.getDate() !== date2.getDate()) {
      return false;
    }
    if (date1.getMonth() !== date2.getMonth()) {
      return false;
    }
    if (date1.getFullYear() !== date2.getFullYear()) {
      return false;
    }

    return true;
  }
}
