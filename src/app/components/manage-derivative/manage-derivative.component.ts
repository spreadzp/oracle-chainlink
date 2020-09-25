import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconProviderService } from 'src/app/services/icon-provider.service'; 
@Component({
  selector: 'app-manage-derivative',
  templateUrl: './manage-derivative.component.html',
  styleUrls: ['./manage-derivative.component.scss']
})
export class ManageDerivativeComponent implements OnInit {

  nameDerivative = null;
  expirationPrice = null;
  expirationBlock = null;
  constructor(private iconProviderService: IconProviderService) { }

  ngOnInit(): void {
    this.nameDerivative = new FormControl();
    this.expirationPrice = new FormControl();
    this.expirationBlock = new FormControl();

  }

  onAmountChange(nameVariable: string, data: FormControl) {
    this[nameVariable] = data.value;
    console.log(`${nameVariable}: `, this[nameVariable], 'value', data);
    // this.tokens = this.amount.value;
    // console.log('this.tokens :>> ', this.tokens);
  }

  createDerivative() {
    console.log('info :>> ',  this.nameDerivative  ,    this.expirationPrice  ,
    this.expirationBlock  );
    this.iconProviderService.createDerivative(this.expirationPrice, this.expirationBlock, this.nameDerivative);
  }

}
