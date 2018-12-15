import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';


@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: Location = {
     lat: 20.257763,
     lng: 85.793277  
  };

  constructor(private modalCtrl: ModalController){}

  onSubmit(form: NgForm){
    console.log(form.value);
  }

  onOpenMap(){
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location});
    modal.present();
  }
}
