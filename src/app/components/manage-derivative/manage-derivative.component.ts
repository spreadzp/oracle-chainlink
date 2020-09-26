import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Derivative } from 'src/app/interfaces/derivative.interface';
import { BoardService } from 'src/app/services/board.service';
import { Web3Service } from 'src/app/services/web3.service';
// import { IconProviderService } from 'src/app/services/icon-provider.service';
@Component({
  selector: 'app-manage-derivative',
  templateUrl: './manage-derivative.component.html',
  styleUrls: ['./manage-derivative.component.scss']
})
export class ManageDerivativeComponent implements OnInit {
activeDerivative: Derivative = null;

  expirationPrice = null;
  amount = null;
  activeAccount = '';

  constructor(private boardService: BoardService, private web3Service: Web3Service) { }

  ngOnInit(): void {

    this.expirationPrice = new FormControl();
    this.amount = new FormControl();
    this.web3Service.activeAccount.subscribe(account => this.activeAccount = account);
    this.boardService.choisedDerivative.subscribe(derivative => this.activeDerivative = derivative );

  }

  onAmountChange(nameVariable: string, data: FormControl) {
    this[nameVariable] = data.value;
    console.log(`${nameVariable}: `, this[nameVariable], 'value', data);
    // this.tokens = this.amount.value;
    // console.log('this.tokens :>> ', this.tokens);
  }

  buyDerivative() {
    console.log('info :>> ', this.expirationPrice,
    this.amount  );

    this.boardService.getBoardContract().subscribe((deployed) => {

      const t = deployed.then((contract) => {
        contract.buyDerivative(this.activeDerivative.hash, +this.expirationPrice, +this.amount, { from: this.activeAccount, gas: 600000 })
          .then((hash) => {
            console.log('hash :>> ', hash);
            this.expirationPrice = null;
            this.amount = null;
            const logs = hash.logs[0].args[0];
            this.boardService.setHash(logs);
          }

          );
      });
      console.log('t :>> ', t);
    });
  }

}
