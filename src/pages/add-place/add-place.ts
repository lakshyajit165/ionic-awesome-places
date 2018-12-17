import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: Location = {
     lat: 20.287914,
     lng: 85.845120  
  };

  locationIsSet = false;
  imageUrl: any;

  constructor(private modalCtrl: ModalController, private geolocation: Geolocation,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController,
              private camera: Camera){}

  onSubmit(form: NgForm){
    console.log(form.value);
  }

  onOpenMap(){
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data){
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onLocate(){
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location!'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error =>{
          loader.dismiss();

          const toast = this.toastCtrl.create({
              message: 'Could not get location, please pick it manually :(',
              duration: 2500
          });
          toast.present();
        }
      );
  }

  
  onTakePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imageUrl = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
      console.log(err);
     });
   
    /* this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation : true
    })
    .then(
      imageData => {
        console.log(imageData);
      }
    )
    .catch(
      err =>{
        console.log(err);
      }
    );*/
  }
}
