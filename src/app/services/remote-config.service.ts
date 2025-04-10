import { Injectable } from '@angular/core';
import {
  RemoteConfig,
  fetchAndActivate,
  getValue,
} from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  constructor(private readonly remoteConfig: RemoteConfig) {}

  async init(): Promise<void> {
    try {
      await fetchAndActivate(this.remoteConfig);
    } catch (error) {
      console.warn('Remote Config fetch failed:', error);
    }
  }

  getFlag(flag: string): boolean {
    return getValue(this.remoteConfig, flag).asBoolean();
  }
}
