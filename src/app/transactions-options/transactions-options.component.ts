import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { StatementComponent } from '../components/statement/statement.component';
import { TransferMoneyComponent } from '../components/transfer-money/transfer-money.component';
import { UserBalanceComponent } from '../components/user-balance/user-balance.component';
import { WithdrawComponent } from '../components/withdraw/withdraw.component';


@Component({
  selector: 'app-transactions-options',
  templateUrl: './transactions-options.component.html',
  styleUrls: ['./transactions-options.component.css']
})
export class TransactionsOptionsComponent implements OnInit {
  public selectedIndex: number = 0;

  @ViewChild(WithdrawComponent, { static: true }) public withdrawComponent: WithdrawComponent;
  @ViewChild(UserBalanceComponent, { static: true }) public userBalanceComponent: UserBalanceComponent;
  @ViewChild(TransferMoneyComponent, { static: true }) public transferMoneyComponent: TransferMoneyComponent;
  @ViewChild(StatementComponent, { static: true }) public statementComponent: StatementComponent;

  constructor() { }

  ngOnInit(): void {
  }

  public onTabChange(tabChangeEvent: MatTabChangeEvent): void {
    const index = tabChangeEvent;
    this.selectedIndex = +index;
    switch (this.selectedIndex) {
      case 1:
        this.userBalanceComponent.subscription?.unsubscribe();
        this.transferMoneyComponent.subscription?.unsubscribe();
        break;
      case 2:
        this.withdrawComponent.subscription?.unsubscribe();
        this.transferMoneyComponent.subscription?.unsubscribe();
        break;
      case 3:
        this.withdrawComponent.subscription?.unsubscribe();
        this.userBalanceComponent.subscription?.unsubscribe();
    }
  }

}
