import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api : string = 'https://www.deckofcardsapi.com/api/deck/new/draw/?count=52';
  apiPaises : string = 'https://restcountries.com/v3.1/region/europe?fields=name,flags' //Solo me traigo la bandera y nombre

  constructor(private http: HttpClient) {

  }

  obtenerCartas() {
    return this.http.get(this.api);
  }

  obtenerBanderas(){
    return this.http.get(this.apiPaises);
  }

}
