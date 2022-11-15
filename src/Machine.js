const { Console } = require('@woowacourse/mission-utils');
const { validateWinningNumbersInput, validateBonusNumberInput } = require('./utils/inputValidate');
const Lotto = require('./Lotto');
const User = require('./User');
const Display = require('./Display');

class Machine {
  static user = new User();
  #rankingCountMap;
  #winningNumbers;
  #bonusNumber;

  constructor(payment) {
    Machine.user.payment = payment;
    Machine.user.quantity = payment / Display.info('PRICE');

    this.#winningNumbers = [];
    this.#bonusNumber = 0;
    this.#rankingCountMap = new Map();
  }

  work() {
    this.#issue();
  }

  #issue() {
    let cnt = 0;
    while (cnt < Machine.user.quantity) {
      const numbers = Display.randomNumbers();
      const lotto = new Lotto(numbers);
      Machine.user.purchasedLotto.push(lotto);
      cnt += 1;
    }
  }
}

module.exports = Machine;