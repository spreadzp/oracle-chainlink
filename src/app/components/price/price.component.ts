import { Component, OnInit } from '@angular/core';
import { PriceService } from 'src/app/services/price.service';
import { PriceInfo } from 'src/app/interfaces/priceInfo.interface';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
priceInfo = {} as PriceInfo;

  constructor(private priceService: PriceService) { }

  ngOnInit(): void {
    this.priceService.getPrice().subscribe(price => this.priceInfo = price);
  }

}
