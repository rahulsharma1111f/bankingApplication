import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Transactions } from './static_users_file';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private transactions: ReplaySubject<Transactions> = new ReplaySubject<Transactions>(100);

  constructor() { }

  public setTransaction = (userId: number, transactionType: number, amount: number): void => {
    let obj: Transactions = { amount: amount, userId: userId, transactionType: transactionType, date: new Date() }
    this.transactions.next(obj);
  }

  public getTransactions = () : Observable<Transactions> => {
    return this.transactions.asObservable();
  }

}
