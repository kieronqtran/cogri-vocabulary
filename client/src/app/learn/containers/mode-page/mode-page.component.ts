import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-mode-page',
  templateUrl: './mode-page.component.html',
  styleUrls: ['./mode-page.component.scss'],
})
export class ModePageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onSequenceMode() {
    const startTime = new Date();

    this.router.navigate(['/learn/quiz'], {
      queryParams: { mode: 'sequence' },
    });
  }

  onRandomMode() {
    const startTime = new Date();
    this.router.navigate(['/learn/quiz'], {
      queryParams: { mode: 'random' },
    });
  }
}
