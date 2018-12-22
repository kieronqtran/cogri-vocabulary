import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnPageComponent } from './learn-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('LearnPageComponent', () => {
  let component: LearnPageComponent;
  let fixture: ComponentFixture<LearnPageComponent>;
  let store: Store<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [LearnPageComponent],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
