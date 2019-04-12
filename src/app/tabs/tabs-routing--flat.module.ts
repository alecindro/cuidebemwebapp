import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
import { EventosPage } from '../eventos/eventos.page';
import { AgendatabPage } from '../agendatab/agendatab.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'eventos',
        outlet: 'eventos',
        component: EventosPage
      },
      {
        path: 'agenda',
        outlet: 'agenda',
        component:AgendatabPage
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/(eventos:eventos)',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class TabsRoutingFlatModule { }
