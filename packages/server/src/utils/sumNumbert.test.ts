import { sumNumbers } from './sumNumbers';

describe('sumNumbers util', () => {
  describe('Sum two numbers', () => {
    it('When pass two numbers returns correct result', () => {
      // Arrange
      const a = 5;
      const b = 10;
      // Act
      const result = sumNumbers(a, b);
      // Assert
      expect(result).toEqual(15);
    });
  });
});
