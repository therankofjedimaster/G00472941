import { Injectable } from '@angular/core';
import { from, BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Storage } from './storage';
type MeasurementUnit = 'Metric' | 'US';
@Injectable({
  providedIn: 'root',
})
export class MyData {
  //States with a private BehaviorSubject, the writing stream, and public Observable, the reading stream.
 
  //State for Search Results
 private searchResults$$ = new BehaviorSubject<any[]>([]); 
public searchResults$ = this.searchResults$$.asObservable();

//State for Measurement Unit
 private measurementUnit$$ = new BehaviorSubject<MeasurementUnit>('Metric'); 
public measurementUnit$ = this.measurementUnit$$.asObservable();

//  State for Favourites IDs
private favouriteIds$$ = new BehaviorSubject<number[]>([]);
public favouriteIds$ = this.favouriteIds$$.asObservable();

//Injecting HttpClient and Storage service
  constructor(private http: HttpClient, private storage: Storage) {
   this.loadInitialData();
  }

  //Loads saved settings and favorites from storage upon startup.
 private loadInitialData(): void {
 // Load Measurement Unit from Storage (using 'from' to convert the Promise to an Observable)
from (this.storage.getMeasurementUnit()).subscribe(unit => {
this.measurementUnit$$.next(unit as MeasurementUnit);
});

 // Load Favourites from Storage
from (this.storage.getFavouriteRecipeIds()).subscribe(ids => {
this.favouriteIds$$.next(ids);
 }); }

//Toggles a recipe ID in the favourites list using a Set for clean add/delete logic.

    public async toggleFavourite(recipeId: number): Promise<void> {
        
        //Get the current list of IDs
        const currentIds = this.favouriteIds$$.getValue();
        
        // Convert the current array to a Set for efficient toggling
        const favouriteSet = new Set(currentIds);

        if (favouriteSet.has(recipeId)) {
            // The ID is a favorite, so delete it
            favouriteSet.delete(recipeId); 
        } else {
            // The ID is not a favorite, so add it
            favouriteSet.add(recipeId);    
        }

        // Convert the Set back to an array (Array.from is clean and concise)
        const newIds = Array.from(favouriteSet);

        // Update the state stream (notifies all subscribers)
        this.favouriteIds$$.next(newIds);
        
        // Persist the new list to storage
        await this.storage.setFavouriteRecipeIds(newIds);
 }
}
