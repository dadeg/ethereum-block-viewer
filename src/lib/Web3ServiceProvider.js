/* global web3 */
import Web3 from 'web3';

const INFURA_KEY = 'DVeimfaCgXa3hRLstGPL';

export default class Web3ServiceProvider {
  static create() {
    if (typeof web3 !== 'undefined') {
      return new Web3(web3.currentProvider);
    }

    console.log('no web3, using infura so it is still usable');
    return new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/${INFURA_KEY}`));
  }
}
