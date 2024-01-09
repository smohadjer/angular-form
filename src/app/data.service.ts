import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data = signal({
    value: '',
    status: ''
  });

  setData(update: {value: string, status: string}) {
    this.data.set(update);
  }

  getData(){
    return this.data();
  }
}
