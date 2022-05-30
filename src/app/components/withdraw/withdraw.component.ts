import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { List, Transactions, Users } from 'src/app/common/static_users_file';
import { TransactionsService } from 'src/app/common/transactions.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  public withdrawForm: FormGroup;
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
    this.withdrawForm = this.fb.group({
      userSelect: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  public withdrawData = async (): Promise<void> => {
    Object.keys(this.withdrawForm.controls).forEach(key => {
      this.withdrawForm.get(key).markAsTouched();
    });
    if (this.withdrawForm.invalid) {
      return;
    }
    const formValue = this.withdrawForm.getRawValue();
    if (this.withdrawValidation(formValue)) {
      this.transactionService.setTransaction(formValue.userSelect, 1, formValue.amount);
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
      userAmount = Number(userAmount) + Number(this.getUserSpecificAmount(e, formValue.userSelect));
    });
    if (Number(userAmount) - Number(formValue.amount) <= 0) {
      console.log('not allowed')
      this.errorMessageShow = true;
      return false;;
    }
    this.errorMessageShow = false;
    return true;
  }

}
