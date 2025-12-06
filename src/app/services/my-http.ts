import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Angular's HttpClient
import { Observable } from 'rxjs'; // Observable for async operations
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MyHttp {
  private baseUrl = 'https://api.spoonacular.com/recipes';
  private apiKey = '70759a4f7911402abcc53d3c51d3b759';

   constructor(private http: HttpClient) {} 
    //Fetching recipes based on ingredients
  public getAllRecipes(ingredients: string): Observable<any> {
  const searchUrl = `${this.baseUrl}/complexSearch`;
    let params = new HttpParams()
  .set('apiKey', this.apiKey)
  .set('query', ingredients);
return this.http.get(searchUrl, { params: params });}
//Fetching recipes details by ID
public getRecipeDetails(id: number): Observable<any> {
const detailUrl = `${this.baseUrl}/${id}/information`; 
let params = new HttpParams()
.set('apiKey', this.apiKey); 
return this.http.get(detailUrl, { params: params });
}
}

