import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefrencesModalComponent } from './prefrences-modal.component';

describe('PrefrencesModalComponent', () => {
  let component: PrefrencesModalComponent;
  let fixture: ComponentFixture<PrefrencesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefrencesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefrencesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
