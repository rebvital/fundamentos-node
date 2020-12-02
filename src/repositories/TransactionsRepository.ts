/* eslint-disable prettier/prettier */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];


  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

   public getBalance(): Balance {

    const filterTypeIncome = this.transactions.map(transaction => transaction.type === 'income'? transaction.value : 0)

    const totalIncome = filterTypeIncome.reduce((accumulator, itemtosum) => accumulator + itemtosum, )

    const filterTypeOutcome = this.transactions.map(transaction => transaction.type === 'outcome'? transaction.value : 0)

    const totalOutcome = filterTypeOutcome.reduce((accumulator, itemtosum) => accumulator + itemtosum, )

    const balance: Balance = { income: totalIncome, outcome: totalOutcome, total: totalIncome-totalOutcome };

    return balance;
   }

  public create({title, value, type}: TransactionDTO): Transaction {

    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
