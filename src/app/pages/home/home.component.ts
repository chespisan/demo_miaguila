// Libs
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { AddressesService } from 'src/app/services/addresses/addresses.service';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import * as mapbox from 'mapbox-gl';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Vars
  @ViewChild('mapbox') mapBoxEl: Element;
  private unsubscribe$ = new Subject<void>();
  private map: mapbox.Map;
  private env: any = environment;
  public directions;
  public objAddress: any;
  public addressOrigin: any;

  constructor(
    public _addressesService: AddressesService
  ) {
    //  Address of origin
    this.addressOrigin = {
      lng: -74.103043,
      lat: 4.595985
    }
    // acces token mapbox
    mapbox.accessToken = this.env.mapboxApi;

    // Get Services address to promises
    // this._addressesService.getMyRoutes()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(res => {
    //     this.objAddress = res.data;
    //     console.log('Address', this.objAddress);
    //     this.setDirection(this.objAddress.default_route.address_lnglat);
    //   });


    // Get service address to httpClient json
    this._addressesService.getMyRouteJson()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.objAddress = res.data;
          this.setDirection(this.objAddress.default_route.address_lnglat);
        }
      });

  }

  ngOnInit() {
    this.map = new mapbox.Map({
      container: `mapp`,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.addressOrigin.lng, this.addressOrigin.lat],
      zoom: 16.75
    })

    this.directions = new MapboxDirections({
      accessToken: mapbox.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: {
        inputs: true,
        instructions: false,
        profileSwitcher: false
      }
    });

    this.map.addControl(this.directions, 'top-left');
    this.createMarker(this.addressOrigin.lng, this.addressOrigin.lat);
  }

  ngOnDestroy() {
    //  Unsuscribe getMyRoutes
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createMarker(lng: number, lat: number) {
    const marker = new mapbox.Marker({
      draggable: true
    })
      .setLngLat([lng, lat])
      .addTo(this.map);
  }

  selectAddressDestination(address) {
    this.setDirection(address.address_lnglat);
  }

  setDirection(address) {
    setTimeout(() => {
      this.directions.setOrigin([this.addressOrigin.lng, this.addressOrigin.lat]);
      this.directions.setDestination([address.lng, address.lat]);
    }, 600)
  }
}
