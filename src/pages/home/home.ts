import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Added
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private date;

  constructor(public navCtrl: NavController, private datePicker: DatePicker) {

  }
  dateClick(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => this.date = date,
      err => console.log('Error occurred while getting date: ', err)
    );
  }

}
