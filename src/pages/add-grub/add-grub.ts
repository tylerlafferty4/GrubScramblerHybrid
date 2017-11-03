import { Component } from '@angular/core';
import { Platform, ActionSheetController, NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-add-grub',
  templateUrl: 'add-grub.html'
})

export class AddGrubPage {
  categoryText: string;
  restaurantName: string;
  restaurants: Array<string> = [];
  buttonColor: string = '#49a558' //this.buttonColor = '#49a558';

  constructor(
    public platform: Platform,
    public nav: NavController,
    public actionsheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.categoryText = "Select a Category";
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Fast Food',
          icon: null,
          handler: () => {
            this.categoryText = 'Fast Food';
            this.loadSavedRestaurants();
          }
        },
        {
          text: 'Delivery',
          icon: null,
          handler: () => {
            this.categoryText = 'Delivery';
            this.loadSavedRestaurants();
          }
        },
        {
          text: 'Breakfast',
          icon: null,
          handler: () => {
            this.categoryText = 'Breakfast';
            this.loadSavedRestaurants();
          }
        },
        {
          text: 'Bar',
          icon: null,
          handler: () => {
            this.categoryText = 'Bar';
            this.loadSavedRestaurants();
          }
        },
        {
          text: 'Fancy',
          icon: null,
          handler: () => {
            this.categoryText = 'Fancy';
            this.loadSavedRestaurants();
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
    if (this.categoryText == "Select a Category") {
      let toast = this.toastCtrl.create({
        message: 'Please select a category',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }

    if (this.restaurantName == null) {
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
    this.loadSavedRestaurants();
    this.restaurantName = "";
  }
}
