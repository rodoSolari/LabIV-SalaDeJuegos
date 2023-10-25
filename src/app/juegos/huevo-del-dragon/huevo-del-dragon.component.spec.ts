import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuevoDelDragonComponent } from './huevo-del-dragon.component';

describe('HuevoDelDragonComponent', () => {
  let component: HuevoDelDragonComponent;
  let fixture: ComponentFixture<HuevoDelDragonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuevoDelDragonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuevoDelDragonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
