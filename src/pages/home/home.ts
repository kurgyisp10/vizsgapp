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

  private date : any = new Date();
  private gyakList;
  private edzesList;
  private edzesDb = 0;
  private elsoStart = false;
  private select;
  private select2 = "db";

  constructor(public navCtrl: NavController,
              private datePicker: DatePicker,
              private storage: Storage) {
    this.storage.get('gyakList').then((val) => {
      if (val == null){
        this.gyakList = [];
      }else{
        this.gyakList = val;
      }
    });
    this.storage.get('edzesList').then((val) => {
      if (val == null){
        this.edzesList = [];
        this.elsoStart = true;
      }else{
        this.edzesList = val;
        this.storage.get('edzesDb').then((val2) => {
          this.edzesDb = val2;
        });
      }
    });

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


  SaveEdzes(){
    ++this.edzesDb;
    let temp = {
      date: this.date,

    };
  }

}
