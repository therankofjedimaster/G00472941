import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Angular's HttpClient
import { Observable } from 'rxjs'; // Observable for async operations

@Injectable({
  providedIn: 'root',
})
export class MyHttp {
   constructor(private http: HttpClient) {} 
    private apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  private apiKey = '70759a4f7911402abcc53d3c51d3b759';
  public getAllRecipes(): Observable<any> {
    const url = `${this.apiUrl}/all?access_key=${this.apiKey}`;

    // HttpClient's .get() returns an Observable, which is the standard way to handle async data in Angular.
    return this.http.get(url);
}
}
