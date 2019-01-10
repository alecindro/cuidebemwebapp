import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AgendaPage } from '../agenda/agenda.page';
import { EventosPage } from '../eventos/eventos.page';


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
        component:AgendaPage
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
