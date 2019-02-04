import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventosPage } from './eventos.page';
import { IconEventPipe } from '../icon-event.pipe';
import { MemoPageModule } from '../memo/memo.module';


const routes: Routes = [
  {
    path: '',
    component: EventosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemoPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventosPage,IconEventPipe]
})
export class EventosPageModule {}
