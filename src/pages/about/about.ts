import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Added
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { Storage } from '@ionic/storage';
import { BatteryStatus } from '@ionic-native/battery-status';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private url = "";
  private name;
  private gyakList;
  private defaultImg = "https://d30y9cdsu7xlg0.cloudfront.net/png/883-200.png";

  private add = false;

  constructor(private storage: Storage,
              public navCtrl: NavController,
              private actionSheet: ActionSheet,
              private statusBar: StatusBar,
              private batteryStatus: BatteryStatus) {
    this.storage.get('gyakList').then((val) => {
      if (val == null){
        this.gyakList = [];
      }else{
        this.gyakList = val;
      }
    });
    this.statusBar.backgroundColorByHexString('#ffffff');
  }

  SaveGyak(){
    if(this.url == ""){
      this.url = this.defaultImg;
    }
    let temp = {
      name: this.name,
      url: this.url
    };

    this.gyakList.push(temp);
    this.storage.set('gyakList', this.gyakList);
    this.add = false;
    this.url = "";
    this.name = "";
  }

  AddGyak(){
    this.add = !this.add;
  }

  options: ActionSheetOptions = {
    buttonLabels: [],
    androidEnableCancelButton: true,
    winphoneEnableCancelButton: true,
    addCancelButtonWithLabel: 'Mégse',
    addDestructiveButtonWithLabel: 'Összes törlése'
  };

  DeleteSheet() {
     
    this.actionSheet.show(this.options).then((buttonIndex: number) => {
      console.log('Button pressed: ' + buttonIndex);
      if (buttonIndex == 1) { this.DeleteAll(); }
    });
  }

  

  DeleteAll(){
    this.gyakList = [];
    this.storage.set('gyakList', this.gyakList);
  }

  DeleteThis(i){
    //this.storage.remove(gyak.name);
    //alert(gyak.name);
    this.gyakList.splice(i, 1);
    this.storage.set('gyakList', this.gyakList);
  }
}
