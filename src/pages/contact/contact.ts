import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Added
import { DatePicker } from '@ionic-native/date-picker';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  /*private b = false;
  private level = 200;
  private level2 = 150;*/
  private showAll = true;
  private date = new Date();
  private edzesList;

  constructor(public navCtrl: NavController,
              private datePicker: DatePicker,
              private storage: Storage,
              private statusBar: StatusBar) {
    window.addEventListener("batterylow", onBatteryLow, false);
    
    function onBatteryLow(status) {
        alert("Battery Level Low " + status.level + "%");
    }

    this.storage.get('edzesList').then((val) => {
      if (val == null){
        this.edzesList = [];
      }else{
        this.edzesList = val;
      }
    });
    //alert("Grat!");
    this.statusBar.backgroundColorByHexString('#ffffff');
}

  /*ShowButt(){
    this.b = !this.b;
  }*/

  DateClick(){
    this.datePicker.show({
      date: this.date,
      mode: 'date'
    }).then(
      date => {this.date = date},
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  async DeleteDiary(){
    this.edzesList = [];
    await this.storage.set('edzesList', this.edzesList);
  }

  async Refresh(){
    this.storage.get('edzesList').then((val) => {
      if (val == null){
        this.edzesList = [];
      }else{
        this.edzesList = val;
      }
    });
  }
}
