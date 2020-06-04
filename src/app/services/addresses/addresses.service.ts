import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';




@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  public observableFromPromise: Observable<any>;

  constructor(
    public _http: HttpClient
  ) {

  }

  getMyRoutes() {
    return from(Promise.resolve(
      {
        "status": 200,
        "ok": true,
        "data": {
          "address_origin": {
            "address_tag": "Oficina",
            "lng": -74.103043,
            "lat": 4.595985
          },
          "default_route": {
            "id": 1,
            "address_tag": "Oficina",
            "address": "AV 2 # 534d - 11",
            "address_lnglat": {
              "lng": -74.065033,
              "lat": 4.632847
            }
          },
          "routes_favourites": [
            {
              "id": 1,
              "address_tag": "Casa 2",
              "address": "AV 2 # 534d - 11",
              "address_lnglat": {
                "lng": 74.152292,
                "lat": 4.621020
              }
            },
            {
              "id": 1,
              "address_tag": "Cine",
              "address": "AV 2 # 534d - 11",
              "address_lnglat": {
                "lng": -74.123039,
                "lat": 4.650185
              }
            },
            {
              "id": 1,
              "address_tag": "Parque simon Bolivar",
              "address": "AV 2 # 534d - 11",
              "address_lnglat": {
                "lng": -74.071540,
                "lat": 4.716679
              }
            },
            {
              "id": 1,
              "address_tag": "Novia",
              "address": "AV 2 # 534d - 11",
              "address_lnglat": {
                "lng": -74.045532,
                "lat": 4.732777
              }
            },
            {
              "id": 1,
              "address_tag": "Jefe",
              "address": "AV 2 # 534d - 11",
              "address_lnglat": {
                "lng": -74.056281,
                "lat": 4.749713
              }
            },
            {
              "id": 1,
              "address_tag": "Abuelo",
              "address": "AV 2 # 534d - 11",
              "address_lnglat": {
                "lng": -74.076160,
                "lat": 4.691883
              }
            },
            {
              "id": 1,
              "address_tag": "Abuela",
              "address": "AV 2 # 534d - 11",
              "address_lnglat": {
                "lng": -74.065033,
                "lat": 4.632847
              }
            },
            {
              "id": 2,
              "address_tag": "Restaurante",
              "address": "AV 23 # 53d - 11",
              "address_lnglat": {
                "lng": -74.095948,
                "lat": 4.704790
              }
            },
            {
              "id": 3,
              "address_tag": "Casa Mama",
              "address": "Carrera 1 # 5 - 23",
              "address_lnglat": {
                "lng": -74.043934,
                "lat": 4.702222
              }
            },
            {
              "id": 4,
              "address_tag": "Casa Papa",
              "address": "Av 23 # 53 - 56",
              "address_lnglat": {
                "lng": -74.060287,
                "lat": 4.715372
              }
            },
            {
              "id": 5,
              "address_tag": "Aeropuerto",
              "address": "Carrera 45 # 53 - 23",
              "address_lnglat": {
                "lng": -74.1453619,
                "lat": 4.6981763
              }
            },
            {
              "id": 6,
              "address_tag": "Hermanos",
              "address": "carrera 1a# 24a - 36",
              "address_lnglat": {
                "lng": -74.0980128,
                "lat": 4.6346745
              }
            },
            {
              "id": 7,
              "address_tag": "Campin",
              "address": "calle 1a# 54a - 36",
              "address_lnglat": {
                "lng": -74.0795658,
                "lat": 4.6458605
              }
            }
          ]
        },
        "messages": [
          "Mis rutas"
        ]
      }
    ));
  }

  getMyRouteJson() {
    return this._http.get('/assets/data/address.json');
  }
}
