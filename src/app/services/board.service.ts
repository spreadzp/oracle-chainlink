import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { LotoService } from './loto.service';
import { debounceTime } from 'rxjs/operators';
import { Derivative } from '../interfaces/derivative.interface';
import { Web3Service } from './web3.service';

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
  private hashSource = new BehaviorSubject('');
  hashDerivative = this.hashSource.asObservable();
  private choiceDerivativeSource = new BehaviorSubject<Derivative>({} as Derivative);
  choisedDerivative = this.choiceDerivativeSource.asObservable();
  private hashesActiveFuturesSource = new BehaviorSubject<Derivative[]>([]);
  poolActiveDerivatives = this.hashesActiveFuturesSource.asObservable();
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

  setHash(hash: string) {
    this.hashSource.next(hash);
  }

  setActiveDerivative(derivative: Derivative) {
    this.choiceDerivativeSource.next(derivative);
  }

  setActiveDerivatives(poolHashes: string[]) {

    const derivatives: Derivative[] = [];
    poolHashes.map(hashDerivative => {
      const der: Derivative = {hash: hashDerivative, startBlockExpiration: 0, durationExpiration: 100};
      derivatives.push(der);
    });
    this.hashesActiveFuturesSource.next(derivatives);
  }

  setJpAbstraction() {
    return this.web3Service
      .artifactsToContract(boardArtifacts)
      .then(async (BoardAbstraction) => {
        // return BoardAbstraction.deployed();
        return BoardAbstraction.at('0x3304A034E2317b78a7d15b27FF1a864C980f550d');
      });
  }
}
