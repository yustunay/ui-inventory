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

  product: Product
  id:number

  constructor(
    private productService:ProductDataService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.product = new Product(this.id,'','',0);

    if (this.id != -1) {
      this.productService.retrieveProduct(this.id)
        .subscribe(
          data => this.product = data
        )
    }
  }

  saveProduct() {

    console.log(this.id === -1)

    if (this.id == -1) { //=== when comparing objects... == when comparing primitives...
      this.productService.createProduct(this.product)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(["products"])
          }
        )
    } else {
      this.productService.updateProduct(this.id, this.product)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(["products"])
          }
        )
    }
  }

}
