// Libs
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { AddressesService } from 'src/app/services/addresses/addresses.service';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import * as mapbox from 'mapbox-gl';
import { MapBoxService } from 'src/app/services/map-box/map-box.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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
  public addressFrom: FormGroup;
  public directions;
  public geocoder;
  public objAddress: any;
  public addressOrigin: any;
  public addressOriginn: any;

  constructor(
    public _addressesService: AddressesService,
    public _mapBoxService: MapBoxService
  ) {
    // acces token mapbox
    mapbox.accessToken = this.env.mapboxToken;

    this.addressFrom = new FormGroup({
      addressOrigin: new FormControl(''),
      addressDestination: new FormControl('', { validators: [Validators.required] })
    });

    // Get service address to httpClient json
    this._addressesService.getMyRouteJson()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.objAddress = res.data;
          this.addressOriginn = res.data.address_origin;
          this.createMap(res.data);
        }
      });
  }
  ngOnInit() { }

  ngOnDestroy() {
    //  Unsuscribe getMyRoutes
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Create map Mapbox
  createMap(data) {
    this.map = new mapbox.Map({
      container: `mapp`,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [data.address_origin.lng, data.address_origin.lat],
      zoom: 16.75
    });

    this.directions = new MapboxDirections({
      accessToken: mapbox.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: {
        inputs: false,
        instructions: false,
        profileSwitcher: false
      }
    });
    this.map.addControl(this.directions, 'top-left');
    this.setDirectionOrigin(data.address_origin);
    this.setDirectionDestination(data.default_route.address_lnglat);
    // this.createMarker(data.address_origin.lng, data.address_origin.lat);
  }

  //  Create Marker to Map
  createMarker(lng: number, lat: number) {
    const marker = new mapbox.Marker({
      draggable: true
    })
      .setLngLat([lng, lat])
      .addTo(this.map);
  }

  // Selected Address Destiantion map
  selectAddressDestination(address) {
    this.setDirectionDestination(address.address_lnglat);
  }


  setAddressGeocoding() {
    if (!this.addressFrom.valid) {
      return;
    }
    this._mapBoxService.geoCodingMapBox(this.addressFrom.value.addressDestination).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      let coords = {
        lat: res.features[0].geometry.coordinates[1],
        lng: res.features[0].geometry.coordinates[0]
      }
      this.setDirectionDestination(coords);
    })
  }

  // Set Direction origin in the Map
  setDirectionOrigin(addressOrigin) {
    this.directions.setOrigin([addressOrigin.lng, addressOrigin.lat]);
  }

  // Set Direction destination in the Map
  setDirectionDestination(address) {
    setTimeout(() => {
      this.directions.setDestination([address.lng, address.lat]);
      this.addressFrom.reset();
      this.addressFrom.controls['addressDestination'].clearValidators();
    }, 600)
  }
}
