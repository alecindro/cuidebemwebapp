import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { TabsRoutingFlatModule } from './tabs-routing--flat.module';
import { AgendaPageModule } from '../agenda/agenda.module';
import { EventosPageModule } from '../eventos/eventos.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsRoutingFlatModule,
    AgendaPageModule,
    EventosPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
