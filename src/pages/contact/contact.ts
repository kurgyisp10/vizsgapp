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
  private level2 = 150;

  constructor(public navCtrl: NavController,
              private batteryStatus: BatteryStatus,
              private brightness: Brightness) {
                window.addEventListener("batterylow", onBatteryLow, false);
                
                function onBatteryLow(status) {
                    alert("Battery Level Low " + status.level + "%");
                    this.level = status.level;
                    let brightnessValue: number = 0.2;
                    this.brightness.setBrightness(brightnessValue);
                }
                window.addEventListener("batterystatus", onBatteryStatus, false);
                
                function onBatteryStatus(status) {
                  this.level2 = status.level;
                }
  }

  ShowButt(){
    this.b = !this.b;
  }
}
