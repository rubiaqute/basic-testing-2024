import { BankAccount, getBankAccount, InsufficientFundsError, SynchronizationFailedError } from '.';
const TEST_INITIAL_BALANCE = 780
jest.unmock('lodash');
const lodash = jest.requireActual('lodash');

describe('BankAccount', () => {
  let bankAccountInstance: BankAccount

  beforeEach(() => bankAccountInstance = getBankAccount(TEST_INITIAL_BALANCE))
  afterEach(()=> jest.clearAllMocks())

  test('should create account with initial balance', () => {
    expect(bankAccountInstance.getBalance()).toBe(TEST_INITIAL_BALANCE)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(()=>bankAccountInstance.withdraw(800)).toThrowError(InsufficientFundsError)
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccountInstance.transfer(800, getBankAccount(TEST_INITIAL_BALANCE))).toThrowError()
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccountInstance.transfer(800, bankAccountInstance)).toThrowError()
  });

  test('should deposit money', () => {
    bankAccountInstance.deposit(20)
    expect(bankAccountInstance.getBalance()).toBe(800)
  });

  test('should withdraw money', () => {
    bankAccountInstance.withdraw(20)
    expect(bankAccountInstance.getBalance()).toBe(760)
  });

  test('should transfer money', () => {
    const newBankAccount = getBankAccount(0)
    bankAccountInstance.transfer(60, newBankAccount)
    
    expect(bankAccountInstance.getBalance()).toBe(720)
    expect(newBankAccount.getBalance()).toBe(60)
    
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 1);

    expect(typeof await bankAccountInstance.fetchBalance()).toBe('number')
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 1);

    await bankAccountInstance.synchronizeBalance()
    expect(bankAccountInstance.getBalance()).not.toBe(TEST_INITIAL_BALANCE)
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn(() => 0);

    expect(() => bankAccountInstance.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError)
  });
});
