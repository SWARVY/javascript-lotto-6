import { BRACKET, DIVIDER } from '../constants/Symbol.js';
import LottoGame from '../model/LottoGame.js';
import LottoResultCalculator from '../model/LottoResultCalculator.js';
import Lotto from '../Lotto.js';
import BonusLotto from '../model/BonusLotto.js';

export default class LottoService {
  /**
   * @type {LottoGame}
   */
  #lottoGame;

  /**
   * @type {Lotto}
   */
  #lotto;

  /**
   * @type {BonusLotto}
   */
  #bonusLotto;

  constructor(seedMoney) {
    this.#lottoGame = new LottoGame(seedMoney);
  }

  /**
   * @public
   * @returns {{lottoAmount: number, lottoList: string[]}}
   */
  getLottoList() {
    const { lottoList, lottoAmount } = this.#lottoGame.getLottoes();

    return {
      lottoList: Array.from(
        lottoList,
        (lotto) =>
          `${BRACKET.open}${lotto.getLottoNumbers().join(DIVIDER.spaceComma)}${
            BRACKET.close
          }`
      ),
      lottoAmount,
    };
  }

  /**
   * @public
   * @param {string} mainNumbers
   * @param {string} bonusNumber
   * @returns {{lottoResults: {prizeAmount: number[], prizeTotal: number}, lottoAmount: *}}
   */
  getCompareResults(mainNumbers, bonusNumber) {
    this.#lotto = new Lotto(mainNumbers);
    this.#bonusLotto = new BonusLotto(mainNumbers, bonusNumber);

    const { lottoList, lottoAmount } = this.#lottoGame.getLottoes();
    const lottoResultCalculator = new LottoResultCalculator();

    return {
      lottoResults: lottoResultCalculator.calculateResults(
        lottoList,
        this.#lotto.getLottoNumbers(),
        this.#bonusLotto.getBonusLottoNumber()
      ),
      lottoAmount,
    };
  }
}
