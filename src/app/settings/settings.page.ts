import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton } from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {heart, settings, home} from 'ionicons/icons';

addIcons({
  'heart': heart,
  'settings': settings,
  'home': home
});
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class SettingsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
