import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessFileTabComponent } from './process-file-tab.component';

describe('ProcessFileTabComponent', () => {
  let component: ProcessFileTabComponent;
  let fixture: ComponentFixture<ProcessFileTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessFileTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessFileTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
