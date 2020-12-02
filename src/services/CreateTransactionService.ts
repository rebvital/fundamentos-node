/* eslint-disable prettier/prettier */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type} : TransactionDTO ): Transaction {

    if(type === 'outcome' && value > this.transactionsRepository.getBalance().total) {
        throw Error('Outcome value invalid');
    }

    const transaction = this.transactionsRepository.create({title, value, type});

    return transaction;
  }
}

export default CreateTransactionService;
