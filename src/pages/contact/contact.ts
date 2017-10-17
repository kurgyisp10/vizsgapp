import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Added
import { DatePicker } from '@ionic-native/date-picker';
import { BatteryStatus } from '@ionic-native/battery-status';
import { Brightness } from '@ionic-native/brightness';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  private b = false;
  private level = 200;
  private level2 = 150;
  private showAll = true;
  private date = new Date();
  private edzesList;
  private edzesGyak = {
    date: this.date,
    array: []
  };

  constructor(public navCtrl: NavController,
              private datePicker: DatePicker,
              private batteryStatus: BatteryStatus,
              private brightness: Brightness,
              private storage: Storage,
              private statusBar: StatusBar) {
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
    this.storage.get('edzesList').then((val) => {
      if (val == null){
        this.edzesList = [];
      }else{
        this.edzesList = val;
      }
    });
    this.statusBar.backgroundColorByHexString('#ffffff');
}

  ShowButt(){
    this.b = !this.b;
  }

  DateClick(){
    this.datePicker.show({
      date: this.date,
      mode: 'date'
    }).then(
      date => {this.date = date},
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}
