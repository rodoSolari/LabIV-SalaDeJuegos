import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  api : string = 'https://www.deckofcardsapi.com/api/deck/new/draw/?count=52';

  constructor(private http: HttpClient) {

  }

  obtenerCartas() {
    return this.http.get(this.api);
  }

}
