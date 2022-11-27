import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosTabComponent } from './photos-tab.component';

describe('PhotosTabComponent', () => {
  let component: PhotosTabComponent;
  let fixture: ComponentFixture<PhotosTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
