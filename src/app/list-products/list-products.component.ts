import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { ProductDataService } from '../service/data/product-data.service';
import { Router } from '@angular/router';
import { Observable, ObservableInput } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';

export class Product{
  constructor(
    public id: number,
    public barcode: string,
    public name: string,
    public quantity: number
  ){}
}

 let products : Product[]=[];

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  providers: [DecimalPipe]
})

export class ListProductsComponent implements OnInit {

  products$: Observable<Product[]>;
  filter = new FormControl('');

  constructor(
    private pipe: DecimalPipe,
    private productService:ProductDataService,
    private router:Router
  ) {}

  ngOnInit() {
    this.refreshProducts();
  }

  refreshProducts(){
    this.productService.retrieveAllProducts().subscribe(
      response => {
        console.log(response);
        products = response;
        this.products$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, this.pipe))
        );
      }
    )
  }

  search(text: string, pipe: PipeTransform): Product[] {
    return products.filter(product => {
      const term = text.toLowerCase();
      return product.barcode.toLowerCase().includes(term) || //pipe.transform(product.name).includes(term)
             product.name.toLowerCase().includes(term);
    });
  }
  
}
