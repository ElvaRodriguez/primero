import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, MenuController, ToastController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router, Params } from '@angular/router';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

declare var google;

@Component({
  selector: 'app-geo',
  templateUrl: './geo.page.html',
  styleUrls: ['./geo.page.scss'],
})
export class GeoPage implements OnInit {

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();


  @ViewChild('map') mapElement: ElementRef;
  map: any;

  startPosition: any;
  originPosition: any;
  destinationPosition: any;


  constructor(
    private geolocation: Geolocation,
    public statusbar: StatusBar,
    public screen: SplashScreen,
    public router: Router,
    private ruta: ActivatedRoute, public toastCrl: ToastController,
    public alertController: AlertController, public menu: MenuController
  ) { }

  ngOnInit() {
    this.initializeMapbox();
  }

  initializeMapbox(){

    mapboxgl.accessToken = 'pk.eyJ1IjoiZWx2YWhvcGUiLCJhIjoiY2wycXNyNGUyMGJsYjNqcWliOGk4bDhiZyJ9.7pVjwTPbmgpK_vTyD8FKTw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 10,
      center: [-52.3355, -23.1313]
    });

    map.on('load' , () => {
      map.loadImage(
        '/assets/marker.jpg',
        (error, image) => {
          if(error) throw error;

          map.addImage('marker', image);

          map.addSource('point', {
            'type': 'geojson',
            'data': {
            'type': 'FeatureCollection',
            'features': [
            {
               'type': 'Feature',
               'properties': {
                    'title': 'Farmacia del Pueblo',
                    'description':
                              '<strong>Farmacia del Pueblo</strong><p> Horario de atención: 06:00 a.m - 22:00 p.m</p>'
                  },
                    'geometry': {
                    'type': 'Point',
                    'coordinates': [-54.67575, -25.48254]
                    }
                  },
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'Farmacia Milagritos',
                         'description': '<strong>Farmacia Milagritos</strong><p> Horario de atención: 24hs</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.67745 , -25.48146]
                         }
                  },
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'Farmacia Amaia',
                         'description': '<strong>Farmacia Amaia</strong><p>Horario de atención: 07:30 a.m - 21:00 p.m</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.66374 , -25.48460]
                         }
                  },
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'Farmacia Stock',
                         'description': '<strong>Farmacia Stock</strong><p>Horario de atención: 07:00 a.m - 00:00 p.m</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.66306, -25.48480]
                         }
                  },
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'PuntoFarma',
                         'description': '<strong>Punto Farma</strong><p>Horario de atención: 06:00 a.m - 23:00 p.m</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.64511, -25.51486]
                         }
                  },
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'Farmacenter',
                         'description': '<strong>Farmacenter</strong><p>Horario de atención: 06:00 a.m - 23:00 p.m</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.67727, -25.49026]
                         }
                  },
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'Don Jorge',
                         'description': '<strong>Farmacia Don Jorge</strong><p>Horario de atención: 06:00 a.m - 20:00 p.m</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.68764, -25.49435]
                         }
                  },
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'Farmacia Dig Robert',
                         'description': '<strong>Farmacia Dig Robert</strong><p>Abierto 24hs</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.66716, -25.50046]
                         }
                  },
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'Farmacia San Jorge',
                         'description': '<strong>Farmacia San Jorge</strong><p>Horario de atención: 07:30 a.m - 21:00 p.m</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.66599, -25.49740]
                         }
                  },
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'Farmacia Catedral',
                         'description': '<strong>Farmacia Catedral</strong><p>Horario de atención: 07:00 a.m - 21:00 p.m</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.67868, -25.49620]
                         }
                  }/*,
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'Farmacia Maria Auxiliadora',
                         'description': '<strong>Farmacia Maria Auxiliadora</strong><p>Horario de atención: 07:00 a.m - 19:00 p.m</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.73961, -25.49332]
                         }
                  },
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'Farmacia Santa Rita',
                         'description': '<strong>Farmacia Santa Rita</strong><p>Abierto 24hs</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.76270, -25.48399]
                         }
                  }*/,
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'ProntoFarma',
                         'description': '<strong>ProntoFarma</strong><p>Abierto 24hs</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.66002, -25.48420]
                         }
                  }/*,
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'Farmavida',
                         'description': '<strong>Farmavida</strong><p>Horario de atención: 06:30 a.m - 23:30 p.m</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.62982, -25.40385]
                         }
                  },
                  {
                    'type': 'Feature',
                    'properties': {
                         'title': 'Farmacia La Amistad',
                         'description': '<strong>Farmacia La Amistad</strong><p>Abierto 24hs</p>'
                       },
                         'geometry': {
                         'type': 'Point',
                         'coordinates': [-54.64163, -25.40564]
                         }
                  }*/]
            }});
             
            // Add a layer to use the image to represent the data.
            map.addLayer({
            'id': 'point',
            'type': 'symbol',
            'source': 'point', // reference the data source
            'layout': {
            'icon-image': 'marker', // reference the image
            'icon-size': 0.07,
            'icon-allow-overlap': true,
            
            }
            });

           
        map.on('click', 'point', (e) => {
 
           const coordinates = e.features[0].geometry.coordinates.slice();
           const description = e.features[0].properties.description;
   
 
           while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
   
           new mapboxgl.Popup() .setLngLat(coordinates).setHTML(description).addTo(map);
         
          });
   
 
             map.on('mouseenter', 'point', () => { map.getCanvas().style.cursor = 'pointer'; });
   
 
             map.on('mouseleave', 'point', () => { map.getCanvas().style.cursor = ''; });
        }
      )
    })

    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }));

    map.addControl(new mapboxgl.NavigationControl({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }));

    this.geolocation.getCurrentPosition()
    .then((response) => {
      this.startPosition = response.coords;
      map.setCenter([this.startPosition.longitude, this.startPosition.latitude]);

      var marker = new mapboxgl.Marker()
      .setLngLat([this.startPosition.longitude, this.startPosition.latitude])
      .addTo(map);

    })
    
  }
  

  initializeMap(){
    this.geolocation.getCurrentPosition()
    .then((res) => {
      this.startPosition = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
      const mapOptions = {
        zoom: 18,
        center: this.startPosition,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.directionsDisplay.setMap(this.map);
    }).catch((err) => {
      console.log('Error', err);
    });
  }


  traceRoute(service: any, display: any, request: any){
    service.route(request, function(result, status) {
      if(status == 'OK'){
        display.setDirections(result);
      }
    });
  }

  calculateRoute(){
    if(this.destinationPosition && this.startPosition){
      const request = {
        origin: this.startPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING'
      };
      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

}
