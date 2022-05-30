import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsOptionsComponent } from './transactions-options.component';

describe('TransactionsOptionsComponent', () => {
  let component: TransactionsOptionsComponent;
  let fixture: ComponentFixture<TransactionsOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
