import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTabComponent } from './process-tab.component';

describe('ProcessTabComponent', () => {
  let component: ProcessTabComponent;
  let fixture: ComponentFixture<ProcessTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
