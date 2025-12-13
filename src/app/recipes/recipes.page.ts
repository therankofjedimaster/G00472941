import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons, IonSpinner, IonList, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';
import { MyHttp } from '../services/my-http';
import { MyData } from '../services/my-data';
import {addIcons} from 'ionicons';
import {heart, settings} from 'ionicons/icons';
import { RouterLink } from '@angular/router';

addIcons({
  'heart': heart,
  'settings': settings
});
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
  standalone: true,
  imports: [IonNote, IonLabel, IonItem, IonList, IonButtons, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonSpinner, RouterLink, CommonModule, FormsModule]
})
export class RecipesPage implements OnInit {
  //Data properties here
  recipeDetails: any = null;
 recipeId: number | null = null;

 //State properties here
  isLoading: boolean = true;
  error: string | null = null;
  isFavorite: boolean = false;

  //Property for the unit to be used in the HTML *ngIf conditions
  currentUnit: 'Metric' | 'US' = 'Metric';
image: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private myHttp: MyHttp,
    private myData: MyData  
  ) { }

  ngOnInit() {
    //Get the recipe ID from the route parameters
const idString = this.activatedRoute.snapshot.paramMap.get('id');    
if (idString) {
        this.recipeId = Number(idString); // Convert string to number
  // 2. Immediately trigger all necessary logic:
        this.fetchRecipeDetails();
        this.subscribeToUnit();
        this.subscribeToFavorites();  
    }
    else {
        this.error = "No recipe ID provided.";
        this.isLoading = false;
    }

  } // Closing bracket for ngOnInit
 private fetchRecipeDetails(): void {
    if (!this.recipeId) return;

    this.isLoading = true;
    this.error = null;
    
    // Call the HTTP service using a basic subscribe block
    this.myHttp.getRecipeDetails(this.recipeId).subscribe(
      (data: any) => {
        this.recipeDetails = data;
        this.isLoading = false;
      },
      (err: any) => { // Error handling
        console.error('Error fetching recipe details:', err);
        this.error = 'Could not load recipe details. Please try again.';
        this.isLoading = false;
      }
    );
  }

  private subscribeToUnit(): void {
    // Subscribe to the measurement unit stream from the Data Service
    // This subscription will keep the 'currentUnit' property updated globally.
    this.myData.measurementUnit$.subscribe((unit: 'Metric' | 'US') => {
      this.currentUnit = unit;
    });
  }

  private subscribeToFavorites(): void {
    if (!this.recipeId) return;

    // Subscribe to the favorite IDs stream from the Data Service
    // This subscription will keep the 'isFavorite' property updated globally.
    this.myData.favouriteIds$.subscribe((ids: number[]) => {
      // Check if the current recipe ID exists in the list of favorite IDs
      this.isFavorite = ids.includes(this.recipeId!); 
    });
  }

  //Toggles the favorite status by calling the logic in MyDataService.

  toggleFavorite(): void {
    if (this.recipeId) {
      this.myData.toggleFavourite(this.recipeId);
      // The 'isFavorite' property automatically updates via the subscription above
    }
  }
}
