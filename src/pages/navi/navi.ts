import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Added
import { Geolocation } from '@ionic-native/geolocation';

@Component({
    selector: 'page-navi',
    templateUrl: 'navi.html'
})
export class NaviPage {

    private lat1 = 0;
    private lon1 = 0;
    private lat2 = 47.473018;
    private lon2 = 19.0532421;
    private toRad = 0.01745329251;
    private d;

  constructor(public navCtrl: NavController,
              private geolocation: Geolocation) {

                this.geolocation.getCurrentPosition().then((resp) => {
                    this.lat1 = resp.coords.latitude;
                    this.lon1 = resp.coords.longitude;
                   }).catch((error) => {
                     console.log('Error getting location', error);
                   });
                   var R = 6371e3; // metres
                   var φ1 = this.lat1*this.toRad;
                   var φ2 = this.lat2*this.toRad;
                   var Δφ = (this.lat2-this.lat1)*this.toRad;
                   var Δλ = (this.lon2-this.lon1)*this.toRad;
                   
                   var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                           Math.cos(φ1) * Math.cos(φ2) *
                           Math.sin(Δλ/2) * Math.sin(Δλ/2);
                   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                   
                   this.d = R * c; 
  }

}