import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MapBoxService {

  private apiMapBox: any;

  constructor(
    private _http: HttpClient
  ) {
    this.apiMapBox = environment;
  }

  geoCodingMapBox(address) {
    let formateAddress = encodeURI(address);
    const params = new HttpParams({
      fromObject: {
        country: 'CO',
        language: 'es',
        access_token: this.apiMapBox.mapboxToken
      }
    });
    return this._http.get(`${this.apiMapBox.mapboxApi}geocoding/v5/mapbox.places/${formateAddress}.json`, { params })
  }


}
