import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { List, Transactions, Users } from 'src/app/common/static_users_file';
import { TransactionsService } from 'src/app/common/transactions.service';

@Component({
  selector: 'app-user-balance',
  templateUrl: './user-balance.component.html',
  styleUrls: ['./user-balance.component.css']
})
export class UserBalanceComponent implements OnInit {

  public userBalanceForm: FormGroup;
  public UsersList: Array<Users>;
  public balance: number = undefined;
  public subscription: Subscription;

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
    this.userBalanceForm = this.fb.group({
      userSelect: ['', Validators.required],
    });
  }

  public getCurrentBalance = (): void => {
    if (this.userBalanceForm.invalid) {
      return;
    }
    const userId = this.userBalanceForm.getRawValue().userSelect;
    this.balance = 0;
    this.subscription = this.transactionService.getTransactions().subscribe((e: Transactions) => {
      this.balance = Number(this.balance) + Number(this.getUserSpecificAmount(e,userId));
    });
  }

  public getUserSpecificAmount = ( e: Transactions, userId: number): number => {
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

}
