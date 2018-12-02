import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageCallbackComponent } from './login-page-callback.component';

describe('LoginPageCallbackComponent', () => {
  let component: LoginPageCallbackComponent;
  let fixture: ComponentFixture<LoginPageCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageCallbackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
