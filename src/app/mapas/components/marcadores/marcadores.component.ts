import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorConColor{
  color:string;
  marker?:mapboxgl.Marker;
  centro?:[number,number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa')divMapa!:ElementRef
  mapa!:mapboxgl.Map;
  zoomLevel:number=15;
  center:[number,number]=[-64.21072100828925,-31.362190767354456];

  //arreglo de marcadores
  marcadores:MarcadorConColor[]=[];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom:this.zoomLevel
  });

    /* const markerHtml:HTMLElement=document.createElement('div');
    markerHtml.innerHTML='Hola Mundo'; */
/* 
    const marker = new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.mapa) */

      this.leerLocalStorage();
  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const nuevoMarcador= new mapboxgl.Marker({draggable:true,color})
    .setLngLat(this.center)
    .addTo(this.mapa)
    this.marcadores.push({
      color,
      marker:nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend',()=>{
      this.guardarMarcadoresLocalStorage();
    })
  }

  irMarcador(marker:mapboxgl.Marker){
    this.mapa.flyTo({
      center:marker.getLngLat()
    })
  }

  guardarMarcadoresLocalStorage(){

    const lngLat:MarcadorConColor[]=[];

    this.marcadores.forEach(m=>{

      const color=m.color;
      const {lng, lat}=m.marker!.getLngLat();

       lngLat.push({
          color:color,
          centro:[lng,lat]
      })
    })

    localStorage.setItem('marcadores',JSON.stringify(lngLat))

  }

  leerLocalStorage(){

    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr:MarcadorConColor[]=JSON.parse(localStorage.getItem('marcadores')!) 

    lngLatArr.forEach(m=>{
      const newMarker= new mapboxgl.Marker({
        color:m.color,
        draggable:true
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa)

        this.marcadores.push({
          marker:newMarker,
          color:m.color
        });

        newMarker.on('dragend',()=>{
          this.guardarMarcadoresLocalStorage();
          
        })
    })
  }

  borrarMarcador(i:number){
  this.marcadores[i].marker?.remove();
  this.marcadores.splice(i,1);
  this.guardarMarcadoresLocalStorage();
  }


}
