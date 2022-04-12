import { ToastController, ViewWillEnter } from '@ionic/angular';
import { MenuService } from './../new-menu/menu.service';
import { Menu } from './../../models/menu';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit, ViewWillEnter {
  categories: Category[] = [];
  foods: Food[] = [];
  menu: Menu[] = [];

  constructor(private foodService: FoodService, private router: Router, private service: MenuService,
    private cartService: CartService,
    private toastCtrl: ToastController,) {}

  ionViewWillEnter(): void {
    this.service.findMenu().subscribe(data=>{
      this.menu = data.body;
    });
  }

  ngOnInit() {
    this.getCategories();
    this.foods = this.foodService.getFoods();
  }

  getCategories() {
    this.categories = [
      {
        id: 1,
        label: 'All',
        image: 'assets/images/icons/all.png',
        active: true,
      },
      // {
      //   id: 2,
      //   label: 'Burgers',
      //   image: 'assets/images/icons/burger.png',
      //   active: false,
      // },
      {
        id: 3,
        label: 'Makanan',
        image: 'assets/images/icons/dish.png',
        active: false,
      },
      {
        id: 4,
        label: 'Minuman',
        image: 'assets/images/icons/icons8-beer-glass-50.png',
        active: false,
      },
    ];
  }

  goToDetailPage(id: number) {
    this.router.navigate(['detail', id]);
  }

  addItemToCart(food) {
    const cartitem: CartItem = {
      id: food.id,
      name: food.namaNemu,
      price: food.hargaSatuan,
      image: '/appservice/api/menu/file/'+ food.file,
      quantity: 1,
    };

    this.cartService.addToCart(cartitem);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Food added to the cart',
      mode: 'ios',
      duration: 1000,
      position: 'top',
    });

    toast.present();
  }
}
