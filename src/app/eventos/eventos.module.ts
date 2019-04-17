import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventosPage } from './eventos.page';
import { MemoPageModule } from '../memo/memo.module';
import { SharedModule } from '../shared/shared.module';


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
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventosPage]
})
export class EventosPageModule {}
