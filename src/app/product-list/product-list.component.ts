import { Component, OnInit } from '@angular/core';
import { IProductList } from './product-list.interface';
import { ProductListService } from './product-list.service';
import { FormGroup, FormControl, Form } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  genreForm: FormGroup;
  priceForm: FormGroup;
  page: number = 1;

  

  products: IProductList[];
  games: IProductList[];
  order: IProductList[];
  orders = {
    'id': [],
    'name': '',
    'price': [],
    'genre': '',
    'releaseDate': ''
  };
  public keyword;

  private timeout = null;
  
  

  constructor(private productListService: ProductListService) {}

  ngOnInit() {
    this.genreForm = new FormGroup({
      'Action': new FormControl(false),
      'Adventure': new FormControl(false),
      'Sports': new FormControl(false),
      'Simulation': new FormControl(false),
      'Role-Playing': new FormControl(false)
    })
    this.genreForm.valueChanges
      .subscribe((changes) => this.filterGenre(changes))

    this.priceForm = new FormGroup({
      50: new FormControl(false),
      40: new FormControl(false),
      30: new FormControl(false),
      20: new FormControl(false)
    })
    this.priceForm.valueChanges
      .subscribe((changes) => this.filterPrice(changes))

    this.assignProducts();
  }
  
  changePages(event){
    let max = event * 8
    let min = max - 8;
    this.products = this.games.slice(min, max);
  }

  filterGenre(change){
    console.log(change);
    let filteredGames = [];
    let genres = Object.keys(change);
    genres.forEach(genre => {
      if(change[genre]){
        this.games.forEach(game => {
          if(game.genre.includes(genre)){
            filteredGames = [...filteredGames, game];
          }
        })
      }
    })

    if(!filteredGames.length){
      return this.assignProducts();
    }

    this.products = filteredGames;
  }

  filterPrice(change){

    let filteredGames = [];
    let prices = Object.keys(change);
    let orderNumber = 20;

    prices.forEach(price => {
      if(change[price]){
        this.games.forEach(game => {
          if(game.price < +price){
            filteredGames = [...filteredGames, game];
          }
        })
      }
    })

    if(!filteredGames.length){
      return this.assignProducts();
    }

    this.products = filteredGames;
  }



  assignProducts(argumentArr?) {
    if(!this.games){
      this.productListService.getProducts()
      .subscribe( productsReceived => this.games = productsReceived);
    }

    if(argumentArr){
      return this.productListService.getProducts(argumentArr)
        .subscribe( productsReceived => this.products = productsReceived)
    }

    this.productListService.getProducts()
      .subscribe( productsReceived => {
        this.products = productsReceived
        this.changePages(1);
      });
  }

  searchListener(event){
    console.log(event.target.value);
    this.keyword = event.target.value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout( () => {
      if(!this.keyword){
        return this.assignProducts();
      }
      this.assignProducts();
      let filledArray = [];
      this.products.forEach(product => {
        let result = product.name.toUpperCase().includes(this.keyword.toUpperCase());
        if(result) {
          filledArray.push(product.id)
        }
      })
      console.log(filledArray);
      this.assignProducts(filledArray);
    }, 300);

  }
  
  onOrder(event){
    console.log(event.target.id);
    let id = +(event.target.id);
    this.productListService.getProduct(id)
    .subscribe( productReceived => this.makeOrder(productReceived[0]));
  }

  makeOrder(product){
    let uniqueCode = new Date().getTime();
    console.log(uniqueCode);
    let order = {
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      genre: product.genre,
      releaseDate: product.releaseDate,
      uniqueId: uniqueCode
    }
    console.log(product);
    this.productListService.createOrder(order)
    .subscribe( () => {} );
  }

}
