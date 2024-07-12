import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProcessComponent } from './my-process.component';

describe('MyProcessComponent', () => {
  let component: MyProcessComponent;
  let fixture: ComponentFixture<MyProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
