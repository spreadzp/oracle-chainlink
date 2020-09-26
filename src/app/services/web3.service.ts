import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
declare let require: any;
const Web3 = require('web3');
const contract = require('@truffle/contract');

declare let window: any;

@Injectable()
export class Web3Service {
  private web3: any;
  private accounts: string[];
  public ready = false;

  public accountsObservable = new Subject<string[]>();
  public activeAccount = new Subject<string>();

  public blockObservable = new Subject<number>();
  constructor() {
    window.addEventListener('load', (event) => {
      this.bootstrapWeb3();
    });
  }

  public bootstrapWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.ethereum !== 'undefined') {
      // Use Mist/MetaMask's provider
      window.ethereum.enable().then(() => {
        this.web3 = new Web3(window.ethereum);
      });
    } else {
      console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync =
        Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }

    setInterval(() => {
      if (this.web3) {
        this.refreshAccounts();
        this.getLatestBlock();
      }
    }, 1000);
  }

  public toWei(value: number) {
    if (this.web3) {
      const bntokens = this.web3.utils.toBN(value);
      console.log('@@@@bntokens:>> ', value);
      return this.web3.utils.fromWei(value.toString(), 'ether');
    }
  }
  public async artifactsToContract(artifacts) {
    if (!this.web3) {
      const delay = new Promise((resolve) => setTimeout(resolve, 1000));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;
  }

  private async refreshAccounts() {
    const accs = await this.web3.eth.getAccounts();
    this.activeAccount.next(this.web3.currentProvider.selectedAddress);

    // Get the initial account balance so it can be displayed.
    if (accs.length === 0) {
      console.warn(
        "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
      );
      return;
    }

    if (
      !this.accounts ||
      this.accounts.length !== accs.length ||
      this.accounts[0] !== accs[0]
    ) {
      console.log('Observed new accounts');

      this.accountsObservable.next(accs);
      this.accounts = accs;
    }

    this.ready = true;
  }

  getLatestBlock() {
     this.web3.eth.getBlockNumber()
    .then(lastBlock => {
      this.blockObservable.next(lastBlock);
    });

  }
}
