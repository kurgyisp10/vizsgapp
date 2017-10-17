import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Added
import { DatePicker } from '@ionic-native/date-picker';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private date : any = new Date();
  private gyakList;
  private edzesList;
  private edzesGyak = {
    date: this.date,
    array: []
  };
  private edzesDb = 0;
  private elsoStart = false;

  constructor(public navCtrl: NavController,
              private datePicker: DatePicker,
              private storage: Storage,
              public toastCtrl: ToastController) {
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
    this.AddGyak();
  }
  DateClick(){
    this.datePicker.show({
      date: this.date,
      mode: 'date'
    }).then(
      date => {this.date = date, this.edzesGyak.date = date},
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  AddGyak(){    
    let temp = {
      name: "",
      value: 10,
      type: "perc"
    }
    this.edzesGyak.array.push(temp);
  }

  RemoveGyak(){
    this.edzesGyak.array.pop();
  }

  SaveEdzes(){
    ++this.edzesDb;
    this.storage.set('edzesDb', this.edzesDb);
    this.edzesList.push(this.edzesGyak);
    this.storage.set('edzesList', this.edzesList);
    const toast = this.toastCtrl.create({
      message: 'Edzés sikeresen elmentve',
      duration: 3000,
      position: 'center'
    });
    toast.present();
    this.edzesGyak.array = [];
    this.AddGyak();
  }

}
