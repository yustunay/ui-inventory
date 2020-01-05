import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../service/data/product-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../list-products/list-products.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products : Product[]

  constructor(
    private productService:ProductDataService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.productService.retrieveAllProducts()
    .subscribe(
      data => this.products = data
    )
  }

}
