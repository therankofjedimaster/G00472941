import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonLabel, IonInput, IonItem, IonCardContent, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { heart, settings } from 'ionicons/icons';
import { MyHttp } from 'src/app/services/my-http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonItem, IonInput, IonLabel, IonButton, IonButtons, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, CommonModule, FormsModule],
})
export class HomePage {
  public heartIcon = heart;
  public settingsIcon = settings;
  public recipes: any[] = [];
  public ingredients: string = '';
  constructor(private httpService: MyHttp) {
  }
  public searchRecipes() {
  this.httpService.getAllRecipes(this.ingredients).subscribe({
              next: (data: any) => {
                this.recipes = data.results;
              },
    error: (err: any) => {
                console.error('Search failed:', err);
              }
            });
  }
}
