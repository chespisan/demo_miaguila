import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapbox from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('mapbox') mapBoxEl: Element;

  private map: mapbox.Map;
  private env: any = environment;
  public directions2;


  constructor() { }

  ngOnInit(): void {
    mapbox.accessToken = this.env.mapboxApi;
    this.map = new mapbox.Map({
      container: `mapp`,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.103043, 4.595985],
      zoom: 16.75
    })

    this.directions2 = new MapboxDirections({
      accessToken: mapbox.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: {
        inputs: true,
        instructions: false,
        profileSwitcher: false
      }
    });


    var popup = new mapbox.Popup({ offset: 25 }).setText(
      'Construction on the Washington Monument began in 1848.'
    );

    this.map.addControl(this.directions2, 'top-left');



    this.createMarker(-74.103043, 4.595985, popup);
    this.setDirection()
  }

  createMarker(lng: number, lat: number, popup) {
    var el = document.createElement('div');
    el.id = 'marker';
    const marker = new mapbox.Marker(el, {
      draggable: true
    })
      .setPopup(popup)
      .setLngLat([lng, lat])
      .addTo(this.map);

  }

  setDirection() {
    setTimeout(() => {
      this.directions2.setOrigin([-74.103043, 4.595985]);
      this.directions2.setDestination([-74.065033, 4.632847]);
    }, 500)
  }

}
