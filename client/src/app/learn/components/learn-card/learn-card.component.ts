import { Component, Input, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-learn-card',
  templateUrl: './learn-card.component.html',
  styleUrls: ['./learn-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnCardComponent implements OnInit {

  @Input() data;
  @Input() stepper;
  @Input() current;
  @Input() leng;

  formQuizOne: FormGroup;
  formQuizTwo: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectionChange(event) {}

  switchWord() {
    if (this.current < this.leng - 1) {
      this.stepper.next();
    }
    if (this.current === this.leng - 1) {
      this.router.navigate(['/learn']);
    }
  }

}
