import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InterestsTabComponent} from './interests-tab.component';

describe('InterestsTabComponent', () => {
  let component: InterestsTabComponent;
  let fixture: ComponentFixture<InterestsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterestsTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InterestsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
