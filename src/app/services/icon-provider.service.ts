import { Injectable } from '@angular/core';
// import { IconService, HttpProvider, IconWallet } from 'icon-sdk-js';
import IconService, { HttpProvider, IconWallet } from 'icon-sdk-js';
import { PriceService } from './price.service';
import { PriceInfo } from '../interfaces/priceInfo.interface';
import { configData } from '../../../src/environments/config';
@Injectable({
  providedIn: 'root'
})
export class IconProviderService {
  provider = null;
  iconService = null;
  lastPrice = 0;
  priceInfo = {} as PriceInfo;
  constructor(private priceService: PriceService) {
    this.iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));
    this.priceService.getPrice().subscribe(price => this.priceInfo = price);
  }
  /* Create IconService instance */
  // iconService = null;
  async getWallet() {
    // this.provider = new HttpProvider('https://bicon.net.solidwallet.io/api/v3');
    // console.log('this.provider :>> ', this.provider);
    // const iconService = new IconService(this.provider);
    //
    const ks = { 'version': 3, 'id': '38bc33f5-4873-4386-9188-043bb6897bf9', 'address': 'hx961cb5b5859ece30c472312182d12b4c01b8f103', 'crypto': { 'ciphertext': '2d670add77faa900605d300197b7215375c9029b86b59f959582f44fcce9da70', 'cipherparams': { 'iv': '0b6c82cf3ef081e108a250fe919f090b' }, 'cipher': 'aes-128-ctr', 'kdf': 'scrypt', 'kdfparams': { 'dklen': 32, 'salt': 'ef2b2dcc1ff4acf2eec5d01467689b01feb2797e30e59747a66ab83606f31ac1', 'n': 16384, 'r': 8, 'p': 1 }, 'mac': '2004b80ec680981ab331c322aca6b053b66951ea4192c751c170aa292308acf9' }, 'coinType': 'icx' };
    const pw = '12345678_Liza';

    // console.log('wallet :>> ', wallet);
    // let wallet = IconWallet.create(); // Wallet Creation
    // const address = wallet.getAddress(); // Get Address
    // const privateKey = wallet.getPrivateKey(); //  Get Private Key
    // wallet = IconWallet.loadPrivateKey(privateKey);
    // return JSON.stringify(wallet);
    // const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));
    // console.log('iconService :>> ', iconService);
    // const { IconWallet } = iconService;
    // const wallet = IconWallet.create();

    console.log('iconService :>> ', this.iconService);
    const { CallBuilder } = IconService.IconBuilder;
    const wallet = IconWallet.create();
    console.log(wallet.getAddress());
    const callObj = new CallBuilder()
      .to('cx09a47e15ee131726db1f5639a22b86c05a3b17b2')
      .method('hello')
      .build();

    /* Executes a call method to call a read-only API method on the SCORE immediately without creating a transaction on Loopchain */
    const result = this.iconService.call(callObj).execute();
    // const wallet = IconWallet.loadKeystore(ks, pw);

    console.log('result :>> ', result.toString());
    return result;
  }

  async getLastBlock() {
    const block = await this.iconService.getLastBlock().execute();
    console.log('block :>> ', block);
    return block;
  }

  async getLastPrice() {
    const { CallBuilder } = IconService.IconBuilder;
    const callObj = new CallBuilder()
      .to('cx6cfa8651e494e03c10afad2dcf7f884fac0ba46e')
      .method('get_last_price_info')
      .build();

    const result = this.iconService.call(callObj).execute();
    console.log('66result :>> ', result);
    return result;
  }
  async getDerivative() {
    const { CallBuilder } = IconService.IconBuilder;
    const callObj = new CallBuilder()
      .to('cx6cfa8651e494e03c10afad2dcf7f884fac0ba46e')
      .method('getActiveDerivative')
      .build();

    const result = this.iconService.call(callObj).execute();
    console.log('getActiveDerivative :>> ', result);
    return result;
  }
  async setNewPriceAndBlock() {

    const blockNumber = await this.getLastBlock();
    const { SignedTransaction, IconConverter, IconAmount } = IconService;
    const { CallTransactionBuilder } = IconService.IconBuilder;
    const wallet = IconWallet.loadPrivateKey(configData.PRIVATE_KEY);
    const txObj = new CallTransactionBuilder()
      .from('hxb1bd7011876b89300ebfa98be2b3e908d0d8190b')
      .to('cx6cfa8651e494e03c10afad2dcf7f884fac0ba46e')
      .stepLimit(IconConverter.toBigNumber('9000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber('1'))
      .version(IconConverter.toBigNumber('3'))
      .timestamp((new Date()).getTime() * 1000)
      .method('set_last_price')
      .params({
         newPrice: IconConverter.toHex( +this.priceInfo.price * 10e4 ), // IconAmount.of(+this.priceInfo.price, IconAmount.Unit.ICX)  ,
         newBlockNumber: IconConverter.toHex(blockNumber.height) // IconAmount.of(blockNumber.height, IconAmount.Unit.ICX)
         })
      .build();
    /* Create SignedTransaction instance */
    const signedTransaction = new SignedTransaction(txObj, wallet);
    console.log('signedTransaction: ', signedTransaction.getProperties());

    /* Send transaction. It returns transaction hash. */
    const txHash = await this.iconService.sendTransaction(signedTransaction).execute();
    console.log('txHash :>> ', txHash);
    return txHash;
  }

  async createDerivative(expirationPrice: number, expirationBlock: number, nameDerivative: string) {

    const blockNumber = await this.getLastBlock();
    const { SignedTransaction, IconConverter, IconAmount } = IconService;
    const { CallTransactionBuilder } = IconService.IconBuilder;
    const wallet = IconWallet.loadPrivateKey(configData.PRIVATE_KEY);
    const txObj = new CallTransactionBuilder()
      .from('hxb1bd7011876b89300ebfa98be2b3e908d0d8190b')
      .to('cx6cfa8651e494e03c10afad2dcf7f884fac0ba46e')
      .stepLimit(IconConverter.toBigNumber('9000000'))
      .nid(IconConverter.toBigNumber('3'))
      .nonce(IconConverter.toBigNumber('1'))
      .version(IconConverter.toBigNumber('3'))
      .timestamp((new Date()).getTime() * 1000)
      .method('createDerivative')
      .params({
        expirationPrice: IconConverter.toHex(expirationPrice),
        expirationBlock: IconConverter.toHex(expirationBlock),
        infoDerivative: nameDerivative
         })
      .build();
    /* Create SignedTransaction instance */
    const signedTransaction = new SignedTransaction(txObj, wallet);
    console.log('signedTransaction: ', signedTransaction.getProperties());

    /* Send transaction. It returns transaction hash. */
    const txHash = await this.iconService.sendTransaction(signedTransaction).execute();
    console.log('txHash :>> ', txHash);
    return txHash;
  }

  fromHashToString(hash: string) {
    const { SignedTransaction, IconConverter, IconAmount } = IconService;
    console.log('@@@@@@@@hash :>> ', hash);
    return IconConverter.toUtf8(hash);
  }
}
