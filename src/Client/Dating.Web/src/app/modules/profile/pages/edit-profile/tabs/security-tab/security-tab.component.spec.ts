import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityTabComponent } from './security-tab.component';

describe('SecurityTabComponent', () => {
  let component: SecurityTabComponent;
  let fixture: ComponentFixture<SecurityTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
