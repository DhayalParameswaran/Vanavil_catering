import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenearteBillsComponent } from './genearte-bills.component';

describe('GenearteBillsComponent', () => {
  let component: GenearteBillsComponent;
  let fixture: ComponentFixture<GenearteBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenearteBillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenearteBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
