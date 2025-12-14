import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton, IonRadioGroup, IonRadio, IonLabel, IonItem, IonList } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import {addIcons} from 'ionicons';
import {heart, settings, home} from 'ionicons/icons';

addIcons({
  'heart': heart,
  'settings': settings,
  'home': home
});

type MeasurementUnit = 'Metric' | 'US';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonRadio, IonRadioGroup, IonButton, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class SettingsPage implements OnInit { 
  
  public selectedUnit: MeasurementUnit = 'Metric';
  
  constructor(private myData: MyData) {
      addIcons({home,heart,settings}); }

  ngOnInit() {
    this.subscribeToUnit();
  }

  // Uses simple subscription without storing or cleaning up the Subscription object
  private subscribeToUnit(): void {
    this.myData.measurementUnit$.subscribe(unit => {
      this.selectedUnit = unit;
    });
  }

  public unitChanged(event: any): void {
    const newUnit = event.detail.value as MeasurementUnit;
    this.myData.setMeasurementUnit(newUnit); 
  }
}