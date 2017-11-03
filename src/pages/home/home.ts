import { Component } from '@angular/core';
import { ActionSheetController, NavController, ToastController } from 'ionic-angular';
import { AddGrubPage } from '../add-grub/add-grub'
import { SettingsPage } from '../settings/settings'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categoryText: string;
  chosenRestaurant: string;
  restaurants: Array<string>;
  buttonColor: string = '#969191'

  constructor(
    public nav: NavController,
    public actionsheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.categoryText = "Select a Category"
  }

  ionViewWillLeave() {
    this.chosenRestaurant = "";
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
            this.chosenRestaurant = '';
            this.categoryText = 'Fast Food';
            this.loadSavedRestaurants();
          }
        },
        {
          text: 'Delivery',
          icon: null,
          handler: () => {
            this.chosenRestaurant = '';
            this.categoryText = 'Delivery';
            this.loadSavedRestaurants();
          }
        },
        {
          text: 'Breakfast',
          icon: null,
          handler: () => {
            this.chosenRestaurant = '';
            this.categoryText = 'Breakfast';
            this.loadSavedRestaurants();
          }
        },
        {
          text: 'Bar',
          icon: null,
          handler: () => {
            this.chosenRestaurant = '';
            this.categoryText = 'Bar';
            this.loadSavedRestaurants();
          }
        },
        {
          text: 'Fancy',
          icon: null,
          handler: () => {
            this.chosenRestaurant = '';
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
        this.restaurants = null;
        this.buttonColor = '#969191';
      } else {
        this.restaurants = val;
        this.buttonColor = '#49a558';
      }
    });
  }

  scramble() {
    if (this.restaurants == null) {
      let toast = this.toastCtrl.create({
        message: 'You do not have any restaurants in this category',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      return;
    }

    this.chosenRestaurant = this.restaurants[Math.floor(Math.random()*this.restaurants.length)];
  }

  addGrub() {
    this.nav.push(AddGrubPage);
  }

  settings() {
    this.nav.push(SettingsPage);
  }

}
