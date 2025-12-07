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
}
