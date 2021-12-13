import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './models/pokemon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  markerList: google.maps.MarkerOptions[];
  obsPokemon: Observable<Pokemon[]>;
  center: google.maps.LatLngLiteral = { lat: 35.71608, lng: 139.796138 };
  zoom = 8;

  constructor(public http: HttpClient) {}

  preparePokemon = (data: Pokemon[]) => {
    this.markerList = [];
    for (const iterator of data['pokemons']) {
      let m: google.maps.MarkerOptions = {
        position: new google.maps.LatLng(iterator.lat, iterator.lng),
        icon: this.findImage()
      };
      this.markerList.push(m);
    }
  };

  findImage() : google.maps.Icon {
    // Scarico gli immagini e li metto nella cartella assets/img
    return {url: './assets/img/hole.png' , scaledSize: new google.maps.Size(32,32)}
  }

  // ngOnInit() = quando avvio il programma -> esegui questo codice
  ngOnInit() {
    // l'observable obsPokemon riceve i dati dal server python
    //.get<Pokemon>
    this.obsPokemon = this.http.get<Pokemon[]>('http://localhost:5000/all');
    this.obsPokemon.subscribe(this.preparePokemon);
  }
}
