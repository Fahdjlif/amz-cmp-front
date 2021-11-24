import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoockieComponent } from './coockie.component';

describe('CoockieComponent', () => {
  let component: CoockieComponent;
  let fixture: ComponentFixture<CoockieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoockieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoockieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
