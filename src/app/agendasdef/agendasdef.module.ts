import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgendasDefPage } from './agendasdef.page';
import { IconEventPipe } from '../shared/icon-event.pipe';
import { AgendaDefPageModule } from '../agendadef/agendadef.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AgendasDefPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgendasDefPage]
})
export class AgendasDefPageModule {}
