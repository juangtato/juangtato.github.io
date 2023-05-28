import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigEditionPageComponent } from './config-edition-page.component';

describe('ConfigEditionPageComponent', () => {
  let component: ConfigEditionPageComponent;
  let fixture: ComponentFixture<ConfigEditionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ConfigEditionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigEditionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
