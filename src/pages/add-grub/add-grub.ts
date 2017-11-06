import { Component } from '@angular/core';
import { Platform, ActionSheetController, NavController, ToastController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-add-grub',
  templateUrl: 'add-grub.html'
})

export class AddGrubPage {
  categoryText: string;
  restaurantName: string = '';
  restaurants: Array<string> = [];
  buttonColor: string = '#969191';
  DEFAULT_CATEGORY_TEXT = 'Select a Category';

  constructor(
    public platform: Platform,
    public nav: NavController,
    public navParams: NavParams,
    public actionsheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.categoryText = this.DEFAULT_CATEGORY_TEXT;
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Categories',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Fast Food',
          icon: null,
          handler: () => {
            this.categoryText = 'Fast Food';
            this.loadSavedRestaurants();
            this.setAddButtonColor();
          }
        },
        {
          text: 'Delivery',
          icon: null,
          handler: () => {
            this.categoryText = 'Delivery';
            this.loadSavedRestaurants();
            this.setAddButtonColor();
          }
        },
        {
          text: 'Breakfast',
          icon: null,
          handler: () => {
            this.categoryText = 'Breakfast';
            this.loadSavedRestaurants();
            this.setAddButtonColor();
          }
        },
        {
          text: 'Bar',
          icon: null,
          handler: () => {
            this.categoryText = 'Bar';
            this.loadSavedRestaurants();
            this.setAddButtonColor();
          }
        },
        {
          text: 'Fancy',
          icon: null,
          handler: () => {
            this.categoryText = 'Fancy';
            this.loadSavedRestaurants();
            this.setAddButtonColor();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  onTextChange() {
    this.setAddButtonColor();
  }

  setAddButtonColor() {
    if (this.restaurantName != '' && this.categoryText != this.DEFAULT_CATEGORY_TEXT) {
      this.buttonColor = '#49a558';
    } else {
      this.buttonColor = '#969191';
    }
  }

  loadSavedRestaurants() {
    this.storage.get(this.categoryText).then((val) => {
      if (val == null) {
        this.restaurants = [];
      } else {
        this.restaurants = val;
      }
    });
  }

  addRestaurant(event) {
    if (this.categoryText == this.DEFAULT_CATEGORY_TEXT) {
      let toast = this.toastCtrl.create({
        message: 'Please select a category',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }

    if (this.restaurantName == '') {
      let toast = this.toastCtrl.create({
        message: 'Please enter a restaurant name',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }

    this.storage.get(this.categoryText).then((val) => {
      if (val == null) {
        this.restaurants = [];
      } else {
        this.restaurants = val;
      }
    });
    this.restaurants.push(this.restaurantName);
    this.storage.set(this.categoryText, this.restaurants);
    this.restaurantName = "";
    this.loadSavedRestaurants();
    this.setAddButtonColor();
  }
}
