import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResponsaveisPage } from './responsaveis.page';

const routes: Routes = [
  {
    path: '',
    component: ResponsaveisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResponsaveisPage]
})
export class ResponsaveisPageModule {}
