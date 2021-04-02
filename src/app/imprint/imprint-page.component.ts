import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-impressum',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./imprint-page.component.scss'],
})
export class ImprintPage implements OnInit {

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  dismissSelf() {
    this.modalController.dismiss();
  }
}
