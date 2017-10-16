import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Added
import { DatePicker } from '@ionic-native/date-picker';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private date:any = new Date();

  constructor(public navCtrl: NavController,
              private datePicker: DatePicker,
              private storage: Storage) {

  }
  DateClick(){
    this.datePicker.show({
      date: this.date,
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {this.date = date},
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  SaveEdzes(){

  }

}
