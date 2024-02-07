import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

const fsPromises = jest.requireActual('fs/promises');
const path = jest.requireActual('path');
const fs = jest.requireActual('fs');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spiedSetTimeOut = jest.spyOn(global, 'setTimeout');
    const testCallback = jest.fn();
    const testTimeout = 500;

    doStuffByTimeout(testCallback, testTimeout);
    expect(spiedSetTimeOut).toHaveBeenCalledWith(testCallback, testTimeout);
  });

  test('should call callback only after timeout', () => {
    const testCallback = jest.fn();
    const testTimeout = 500;

    doStuffByTimeout(testCallback, testTimeout);

    expect(testCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(testTimeout);
    expect(testCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spiedSetTimeOut = jest.spyOn(global, 'setInterval');
    const testCallback = jest.fn();
    const testTimeout = 500;

    doStuffByInterval(testCallback, testTimeout);
    expect(spiedSetTimeOut).toHaveBeenCalledWith(testCallback, testTimeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const testCallback = jest.fn();
    const testTimeout = 500;
    const timesToCall = 3;

    doStuffByInterval(testCallback, testTimeout);

    expect(testCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timesToCall * testTimeout);
    expect(testCallback).toHaveBeenCalledTimes(timesToCall);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockedJoin = jest.fn();
    path.join = mockedJoin;
    const testPathToFile = 'testPathToFile';

    await readFileAsynchronously(testPathToFile);

    expect(mockedJoin).toHaveBeenCalledWith(
      mockedJoin.mock.calls[0][0],
      testPathToFile,
    );
  });

  test('should return null if file does not exist', async () => {
    path.join = jest.fn(() => 'testFullPath');
    fs.existsSync = jest.fn(() => false);
    const testPathToFile = 'testPathToFile';

    expect(await readFileAsynchronously(testPathToFile)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    path.join = jest.fn(() => 'testFullPath');
    fs.existsSync = jest.fn(() => true);
    const testFileContent = 'testFileContent';
    fsPromises.readFile = jest.fn(() => Promise.resolve(testFileContent));
    const testPathToFile = 'testPathToFile';

    expect(await readFileAsynchronously(testPathToFile)).toBe(testFileContent);
  });
});
