import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink} from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonItem, IonSpinner, IonLabel, IonCard, IonList, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { MyHttp } from '../services/my-http';
import {addIcons} from 'ionicons';
import {heart, settings, home} from 'ionicons/icons';

addIcons({
  'heart': heart,
  'settings': settings,
  'home': home
});

// Interface for the data we need to display on the Favourites page
interface RecipeListItem {
  id: number;
  title: string;
  image: string;
}
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonList, IonCard, IonLabel, IonSpinner, IonItem, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class FavouritesPage implements OnInit {
  // List of favorite recipes to display
  public favoriteRecipes: RecipeListItem[] = [];
  public isLoading: boolean = true;
  public error: string | null = null;
  // Inject MyData and MyHttp services
  constructor(
    private myData: MyData,
    private myHttp: MyHttp
  ) { }
// OnInit lifecycle hook to load favorites when the component initializes
  ngOnInit() {
    this.loadFavourites();
  }
  // Method to load favorite recipes
  private loadFavourites(): void {
    this.isLoading = true;
    this.error = null;
    
    // Subscribe to the stream of favorite IDs
    this.myData.favouriteIds$.subscribe({
      next: (ids) => {
        // Reset list and set loading state for a fresh list fetch
        this.favoriteRecipes = [];
        
        if (ids.length === 0) {
          this.isLoading = false;
          return; 
        }
        
        // Counter to manually track when all async HTTP requests are finished
        let completedRequests = 0;
        
        ids.forEach(id => {
          // Nested subscription: For each ID, fetch the details
          this.myHttp.getRecipeDetails(id).subscribe({
            next: (recipe) => {
              this.favoriteRecipes.push(recipe);
              completedRequests++;
              
              // Check if all requests have returned
              if (completedRequests === ids.length) {
                this.isLoading = false;
              }
            },
            // Handle error for individual recipe fetch
            error: (err) => {
              console.error('Error fetching recipe ID:', id, err);
              this.error = 'Failed to load all favorite recipes.';
              completedRequests++;
              // Even on error, check if all requests have returned
              if (completedRequests === ids.length) {
                this.isLoading = false;
              }
            }
          });
        });
      },
       // Handle error if the initial list of IDs couldn't be retrieved
      error: (err) => {
        this.error = 'Could not retrieve favorite IDs.';
        this.isLoading = false;
      }
    });
  }
}