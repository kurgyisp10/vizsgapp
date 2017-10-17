import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Added
import { Geolocation } from '@ionic-native/geolocation';

@Component({
    selector: 'page-navi',
    templateUrl: 'navi.html'
})
export class NaviPage {

    private lat;
    private lon;
    private d;

  constructor(public navCtrl: NavController,
              private geolocation: Geolocation) {

                this.geolocation.getCurrentPosition().then((resp) => {
                    this.lat = resp.coords.latitude;
                    this.lon = resp.coords.longitude;
                   }).catch((error) => {
                     console.log('Error getting location', error);
                   });
                   var R = 6371e3; // metres
                   var φ1 = lat1.toRadians();
                   var φ2 = lat2.toRadians();
                   var Δφ = (lat2-lat1).toRadians();
                   var Δλ = (lon2-lon1).toRadians();
                   
                   var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                           Math.cos(φ1) * Math.cos(φ2) *
                           Math.sin(Δλ/2) * Math.sin(Δλ/2);
                   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                   
                   var d = R * c; 
  }

}