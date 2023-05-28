import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameplayPageComponent } from './add-gameplay-page.component';

describe('AddGameplayPageComponent', () => {
  let component: AddGameplayPageComponent;
  let fixture: ComponentFixture<AddGameplayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGameplayPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGameplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
