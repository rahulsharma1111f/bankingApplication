import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionsOptionsComponent } from './transactions-options/transactions-options.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { DepositComponent } from './components/deposit/deposit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { OnlynumbersDirective } from './common/onlynumbers.directive';
import { StatementComponent } from './components/statement/statement.component';
import {MatTableModule} from '@angular/material/table';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { UserBalanceComponent } from './components/user-balance/user-balance.component';
import { TransferMoneyComponent } from './components/transfer-money/transfer-money.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsOptionsComponent,
    DepositComponent,
    OnlynumbersDirective,
    StatementComponent,
    WithdrawComponent,
    UserBalanceComponent,
    TransferMoneyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
