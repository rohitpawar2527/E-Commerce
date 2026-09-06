import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchdata } from './searchdata';

describe('Searchdata', () => {
  let component: Searchdata;
  let fixture: ComponentFixture<Searchdata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchdata],
    }).compileComponents();

    fixture = TestBed.createComponent(Searchdata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
