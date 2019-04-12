import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { TabsRoutingFlatModule } from './tabs-routing--flat.module';
import { EventosPageModule } from '../eventos/eventos.module';
import { AgendatabPageModule } from '../agendatab/agendatab.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsRoutingFlatModule,
    AgendatabPageModule,
    EventosPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
