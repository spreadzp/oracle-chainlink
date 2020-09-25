import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Web3Service } from './web3.service';
// import { LotoService } from './loto.service';
import { debounceTime } from 'rxjs/operators';

declare let require: any;
const boardArtifacts = require('./../../../build/contracts/Board.json');

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  accounts = [];
  boardContractSources$ = null;
  boardContract: Observable<any> = null;
  BoardAbstraction = null;
  constructor(
    private web3Service: Web3Service,
    // private lotoService: LotoService
  ) {
    this.BoardAbstraction = this.setJpAbstraction();
    this.watchAccount();
  }
  getBoardContract(): Observable<any> {
    if (this.BoardAbstraction === null) {
      this.BoardAbstraction = this.setJpAbstraction();
    }
    this.boardContractSources$ = new BehaviorSubject(this.BoardAbstraction);
    return (this.boardContract = this.boardContractSources$.asObservable());
  }
  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  checkFreeTickets() {
    this.getBoardContract().subscribe((deployed) => {
      deployed.then((contract) =>
        contract.getTickets.call().then((tickets) => {
          // this.lotoService.setFreeTickets(tickets);
          // this.lotoService.getStatisticGame(tickets);
        })
      );
    });
  }
  getBoughtTickets(addressGamer: string) {
    this.getBoardContract().subscribe((deployed) => {
      debounceTime(3000);
      deployed.then((contract) =>
        contract.getTickets.call().then((tickets) => {

          tickets.map((item, ind, arr) => {
            if (item.toLowerCase() === addressGamer.toLowerCase()) {
              // this.lotoService.addBallToBacket(ind);
            }
          });
        })
      );
    });
  }

  setJpAbstraction() {
    return this.web3Service
      .artifactsToContract(boardArtifacts)
      .then(async (BoardAbstraction) => {
        // return BoardAbstraction.deployed();
        return BoardAbstraction.at('0x41BA15429467a9F846F3917d1903d3CeDE45b893');
      });
  }
}
