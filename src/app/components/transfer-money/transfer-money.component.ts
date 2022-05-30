import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Users, List, Transactions } from 'src/app/common/static_users_file';
import { TransactionsService } from 'src/app/common/transactions.service';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {

  public transferAmountForm: FormGroup;
  public UsersList: Array<Users>;
  public subscription: Subscription;
  public errorMessageShow: boolean = false;
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
    this.transferAmountForm = this.fb.group({
      fromUser: ['', Validators.required],
      amount: ['', Validators.required],
      toUser: ['', Validators.required],
    });
  }

  public transferAmount = (): void => {
    Object.keys(this.transferAmountForm.controls).forEach(key => {
      this.transferAmountForm.get(key).markAsTouched();
    });
    if (this.transferAmountForm.invalid) {
      return;
    }
    const formValue = this.transferAmountForm.getRawValue();
    if (this.withdrawValidation(formValue)) {
      this.transactionService.setTransaction(formValue.fromUser, 1, formValue.amount);
      this.transactionService.setTransaction(formValue.toUser, 0, formValue.amount);
      this.transactionStatus = true;
    }


  }

  public getUserSpecificAmount = (e: Transactions, userId: number): number => {
    let amount = 0;
    if (e.userId === userId) {
      switch (e.transactionType) {
        case 0:
          amount = amount + e.amount;
          break;
        case 1:
          amount = amount - e.amount;
          break;
      }
    }
    return amount;
  }

  public withdrawValidation = (formValue: any): boolean => {
    let userAmount: number = 0;
    this.subscription = this.transactionService.getTransactions().subscribe((e: Transactions) => {
      userAmount = Number(userAmount) + Number(this.getUserSpecificAmount(e, formValue.fromUser));
    });
    if (Number(userAmount) - Number(formValue.amount) <= 0) {
      console.log('not allowed')
      this.errorMessageShow = true;
      return false;
    }
    this.errorMessageShow = false;
    return true;
  }

}
