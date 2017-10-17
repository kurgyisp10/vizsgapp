import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BatteryStatus } from '@ionic-native/battery-status';
import { Brightness } from '@ionic-native/brightness';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  private b = false;
  private level = 200;

  constructor(public navCtrl: NavController,
              private batteryStatus: BatteryStatus) {
                window.addEventListener("batterylow", onBatteryLow, false);
                
                function onBatteryLow(status) {
                    alert("Battery Level Low " + status.level + "%");
                    this.level = status.level;
                }
  }

  ShowButt(){
    this.b = !this.b;
  }
}
