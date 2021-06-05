import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-install-help',
  templateUrl: './install-help.component.html',
  styleUrls: ['./install-help.component.scss'],
})
export class InstallHelpComponent implements OnInit {

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  dismissSelf() {
    this.modalController.dismiss();
  }

}
