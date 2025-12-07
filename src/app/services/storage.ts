import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  private storage: any| null = null;

  //Defining keys for storage
  private  MEASUREMENT_KEY = 'measurementUnit';
  private  FAVOURITES_KEY = 'favouriteRecipeIds';
  //Defining default values for measurement unit
  public DEFAULT_UNIT = 'Metric';
  // We rely on the constructor to properly inject the Storage service 
  constructor(@Inject('IonicStorage') private storageEngine: any) {
    this.init();
  }
  // Initializes the storage engine
  async init() {
    // Assign the created storage instance to the clean property name
    this.storage = await this.storage.create();
  }
  // Get measurement unit from storage
  public async getMeasurementUnit(): Promise<string> {
    const unit = await this.storage.get(this.MEASUREMENT_KEY);
    return unit || this.DEFAULT_UNIT;
  }
  // Set measurement unit in storage
  public async setMeasurementUnit(unit: string): Promise<void> {
    await this.storage.set(this.MEASUREMENT_KEY, unit); 
  } 
  // Get favourite recipe IDs from storage
  public async getFavouriteRecipeIds(): Promise<number[]> {
    const ids = await this.storage.get(this.FAVOURITES_KEY);
    return ids || [];
  }
  // Set favourite recipe IDs in storage
  public async setFavouriteRecipeIds(ids: number[]): Promise<void> {
    await this.storage.set(this.FAVOURITES_KEY, ids);     
  }
  }
