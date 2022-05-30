import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { List, Transactions, Users } from 'src/app/common/static_users_file';
import { TransactionsService } from 'src/app/common/transactions.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  public depositForm: FormGroup;
  public UsersList: Array<Users>;
  public columns: string[] = ['userId', 'TransactionType',
    'Amount',
    'Date',

  ];
  public allTransactionsList: Array<Transactions> = new Array<Transactions>();
  public dataSourceObservable$: Observable<MatTableDataSource<Transactions>>;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionsService
  ) {
    this.UsersList = (new List).getUsersList();
  }

  ngOnInit(): void {
    this.createForm();
    this.setSubscription();
  }

  private createForm = (): void => {
    this.depositForm = this.fb.group({
      userSelect: ['', Validators.required],
    });
  }

  public getUserDate = (id: number): void => {
    this.allTransactionsList = new Array<Transactions>();
    this.dataSourceObservable$ = this.transactionService.getTransactions().pipe(
      filter((element: Transactions) => element.userId === id),
      map((e: Transactions) => {
          this.allTransactionsList.push(e)
          const dataSource = new MatTableDataSource<Transactions>(this.allTransactionsList);
          return dataSource;
      })
    )
  }

  public setSubscription = (): void => {
    this.dataSourceObservable$ = this.transactionService.getTransactions().pipe(
      map((e: Transactions) => {
        this.allTransactionsList.push(e)
        const dataSource = new MatTableDataSource<Transactions>(this.allTransactionsList);
        return dataSource;
      })
    )
  }



}
