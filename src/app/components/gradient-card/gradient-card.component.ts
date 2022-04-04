import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gradient-card',
  templateUrl: './gradient-card.component.html',
  styleUrls: ['./gradient-card.component.scss'],
})
export class GradientCardComponent implements OnInit {
  @Input() gradient: string = '';

  @ViewChild('gradient_card') gradient_card!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  copyColor(colorIndex: number, ...args: any[]): void {
    navigator.clipboard.writeText(this.gradient[colorIndex]);
  }

  ngAfterViewInit(): void {
    // this.gradient = this.gradient ?? 'dodgerblue, blue';

    this.gradient_card.nativeElement.style.background = `linear-gradient(to right, ${this.gradient})`;
  }
}
