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
  private edzesGyDb = 0;
  private elsoStart = false;
  private saved = true; 

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

  AddGyak(eGyak?){
    if (this.saved){
      let temp = {
        name: "",
        value: 18,
        type: "perc"
      }
      this.edzesGyak.array.push(temp);
      ++this.edzesGyDb;
    }else{
      this.edzesGyak.array.pop();
      console.log(eGyak);
      alert(JSON.stringify(eGyak));
      this.edzesGyak.array.push(eGyak);
      alert(JSON.stringify(this.edzesGyak));
    }
    this.saved = !this.saved;
  }

  RemoveGyak(){
    this.edzesGyak.array.pop();
    --this.edzesGyDb;
  }

  async SaveEdzes(){
    this.edzesList.push(this.edzesGyak);
    await this.storage.set('edzesList', this.edzesList);

    const toast = this.toastCtrl.create({
      message: 'Edzés sikeresen elmentve',
      duration: 3000,
      position: 'top'
    });
    toast.present();
    this.edzesGyak.array = [];
    this.saved = true;
    this.edzesGyDb = 0;
    this.AddGyak();
  }

}
