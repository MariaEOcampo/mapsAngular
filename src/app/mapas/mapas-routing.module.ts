import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenComponent } from './components/full-screen/full-screen.component';
import { MarcadoresComponent } from './components/marcadores/marcadores.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { ZoomRangeComponent } from './components/zoom-range/zoom-range.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'fullscreen', component:FullScreenComponent
      },
      {
        path:'zoomrange', component:ZoomRangeComponent
      }, 
      {
        path:'marcadores', component:MarcadoresComponent
      }, 
      {
        path:'properties', component:PropertiesComponent
      }, 
      {
        path:'**', redirectTo:'fullscreen'
      },
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
