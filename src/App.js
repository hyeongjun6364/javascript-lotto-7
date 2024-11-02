import InputView from './InputView.js';
import Lotto from './Lotto.js';
import OutputView from './OutputView.js';
import { LOTTO_CONSTANTS } from './util/constant.js';
import { pickUniqueNumbersInRange } from './util/missionUtil.js';

class App {
  #lottos;
  #money;

  async run() {
    this.#money = await InputView.processMoney();
    OutputView.printLottoCount(this.#money);
    this.#lottos = await this.createLottos();
    OutputView.printLottoNumbers(this.#lottos);

    InputView.processWinningNumber();
  }

  async createLottos() {
    const lottoCount = this.#money / LOTTO_CONSTANTS.price;

    const lottoNumberPromises = Array.from({ length: lottoCount }, async () => {
      const randomNumber = await this.getSortedRandomNumber();
      return new Lotto(randomNumber);
    });
    const lottoNumbers = await Promise.all(lottoNumberPromises);
    return lottoNumbers;
  }

  async getSortedRandomNumber() {
    const randomNumber = await pickUniqueNumbersInRange(
      LOTTO_CONSTANTS.minLottoNumber,
      LOTTO_CONSTANTS.maxLottoNumber,
      LOTTO_CONSTANTS.length
    );
    return randomNumber.sort((a, b) => a - b);
  }
}

export default App;
