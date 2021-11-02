import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { FullScreenComponent } from './components/full-screen/full-screen.component';
import { MarcadoresComponent } from './components/marcadores/marcadores.component';
import { ZoomRangeComponent } from './components/zoom-range/zoom-range.component';
import { PropertiesComponent } from './components/properties/properties.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    FullScreenComponent,
    MarcadoresComponent,
    ZoomRangeComponent,
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
