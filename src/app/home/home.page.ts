import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton } from '@ionic/angular/standalone';
import { heart, settings } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonButtons, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  public heartIcon = heart;
  public settingsIcon = settings;
  constructor() {
  }
}
