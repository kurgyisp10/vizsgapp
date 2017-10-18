import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NaviPage } from '../navi/navi';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = NaviPage;


  constructor() {

  }
  /*FrissEdzes(){
    alert("Grat!");
    ContactPage.storage.get('edzesList').then((val) => {
      if (val == null){
        ContactPage.edzesList = [];
      }else{
        ContactPage.edzesList = val;
      }
    });
    
  }*/
}
