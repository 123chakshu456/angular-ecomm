import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  // Initialize productList as an empty array or null to handle cases when data is loading
  productList: product[] | undefined; 
  productMessage: string |undefined;
  icon=faTrash;
  editIcon=faEdit;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id:number){
    console.warn("test id", id);
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage = "Product is Deleted";
      }
    })

    setTimeout(()=>{
      this.productMessage=undefined
    },3000);
  }

  list(){
    this.product.productList().subscribe((result: any) => {
      console.warn(result);
      this.productList = result;
    });
  }
}