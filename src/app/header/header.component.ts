import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private route: Router, private product: ProductService) { }

  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  userName:string="";
  cartItems=0;

  ngOnInit(): void {

    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
            let sellerstore = localStorage.getItem('seller');
            let sellerdata = sellerstore && JSON.parse(sellerstore)[0];
            this.sellerName = sellerdata.name;
            this.menuType = 'seller';
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType='user';
          this.product.getCartList(userData.id);
        }
        else {
          this.menuType = 'default';
        }
      });

    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length;
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;

      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = length;
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    this.route.navigate([`search/${val}`]);
  }

  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }
}
