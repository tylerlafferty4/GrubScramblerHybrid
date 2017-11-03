import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  fastFood: Array<string> = [];
  delivery: Array<string> = [];
  breakfast: Array<string> = [];
  fancy: Array<string> = [];
  bar: Array<string> = [];

  constructor(
    public nav: NavController,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.loadBar();
    this.loadFancy();
    this.loadFastFood();
    this.loadDelivery();
    this.loadBreakfast();
  }

  loadFastFood() {
    this.storage.get("Fast Food").then((val) => {
      if (val == null) {
        this.fastFood = [];
      } else {
        this.fastFood = val;
      }
    });
  }

  loadDelivery() {
    this.storage.get("Delivery").then((val) => {
      if (val == null) {
        this.delivery = [];
      } else {
        this.delivery = val;
      }
    });
  }

  loadBreakfast() {
    this.storage.get("Breakfast").then((val) => {
      if (val == null) {
        this.breakfast = [];
      } else {
        this.breakfast = val;
      }
    });
  }

  loadFancy() {
    this.storage.get("Fancy").then((val) => {
      if (val == null) {
        this.fancy = [];
      } else {
        this.fancy = val;
      }
    });
  }

  loadBar() {
    this.storage.get("Bar").then((val) => {
      if (val == null) {
        this.bar = [];
      } else {
        this.bar = val;
      }
    });
  }

  removeItem(category, restaurant) {
    if (category == 'Fast Food') {
      var index = this.fastFood.indexOf(restaurant, 0);
      if (index > -1) {
         this.fastFood.splice(index, 1);
      }
      this.storage.set('Fast Food', this.fastFood);
    } else if (category == 'Delivery') {
      var index1 = this.fastFood.indexOf(restaurant, 0);
      if (index1 > -1) {
         this.fastFood.splice(index1, 1);
      }
      this.storage.set(category, this.delivery);
    } else if (category == 'Breakfast') {
      var index2 = this.fastFood.indexOf(restaurant, 0);
      if (index2 > -1) {
         this.fastFood.splice(index2, 1);
      }
      this.storage.set(category, this.breakfast);
    } else if (category == 'Fancy') {
      var index3 = this.fastFood.indexOf(restaurant, 0);
      if (index3 > -1) {
         this.fastFood.splice(index3, 1);
      }
      this.storage.set(category, this.fancy);
    } else if (category == 'Bar') {
      var index4 = this.fastFood.indexOf(restaurant, 0);
      if (index4 > -1) {
         this.fastFood.splice(index4, 1);
      }
      this.storage.set(category, this.bar);
    }
  }
}
