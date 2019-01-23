import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CuidadorDetailPage } from './cuidador-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CuidadorDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CuidadorDetailPage]
})
export class CuidadorDetailPageModule {}
