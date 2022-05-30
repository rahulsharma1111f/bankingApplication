import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { List, Users, UsersList } from 'src/app/common/static_users_file';
import { TransactionsService } from 'src/app/common/transactions.service';


@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  public depositForm: FormGroup;
  public UsersList: Array<Users>;
  public transactionStatus: boolean = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionsService
  ) {
    this.UsersList = (new List).getUsersList();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm = (): void => {
    this.depositForm = this.fb.group({
      userSelect: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  public depositData = (): void => {
    Object.keys(this.depositForm.controls).forEach(key => {
      this.depositForm.get(key).markAsTouched();
    });
    if (this.depositForm.invalid) {
      return;
    }
    const formValue = this.depositForm.getRawValue();
    this.transactionService.setTransaction(formValue.userSelect, 0, formValue.amount)
    this.transactionStatus = true;
  }

}
