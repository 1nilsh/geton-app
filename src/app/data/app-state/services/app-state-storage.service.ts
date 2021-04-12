import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateStorageService {
  private readonly STORAGE_KEY = 'appstate';

  private appState = null;

  constructor() {
  }

  public async getStateForKey(key: string): Promise<any> {
    if (this.appState === null) {
      await this.loadAppState();
    }
    return this.appState[key];
  }

  public async updateState(key: string, value: any): Promise<void> {
    this.appState[key] = value;
    await this.saveAppState();
  }

  private async saveAppState(): Promise<void> {
    await Storage.set({ key: this.STORAGE_KEY, value: JSON.stringify(this.appState) });
  }

  private async loadAppState(): Promise<void> {
    const data = await Storage.get({ key: this.STORAGE_KEY });
    this.appState = JSON.parse(data.value) ?? {};
  }
}
