import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const incomeValues = this.transactions.map(
      (transaction: Transaction) =>
        transaction.type === 'income' && transaction.value,
    );
    const outcomeValues = this.transactions.map(
      (transaction: Transaction) =>
        transaction.type === 'outcome' && transaction.value,
    );

    const income = incomeValues.reduce(
      (acc: number, value) => Number(acc) + Number(value),
      0,
    );

    const outcome = outcomeValues.reduce(
      (acc: number, value) => Number(acc) + Number(value),
      0,
    );

    const balance = { income, outcome, total: income - outcome };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
