import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Added
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private url;
  private name;
  private gyakList;
  private defaultImg = "https://d30y9cdsu7xlg0.cloudfront.net/png/883-200.png";

  private add = false;

  constructor(private storage: Storage, public navCtrl: NavController) {
    this.storage.get('gyakList').then((val) => {
      if (val == null){
        this.gyakList = [];
      }else{
        this.gyakList = val;
      }
    });
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
  }

  AddGyak(){
    this.add = true;
  }
}
