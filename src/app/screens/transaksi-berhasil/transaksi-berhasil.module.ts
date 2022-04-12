import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransaksiBerhasilPageRoutingModule } from './transaksi-berhasil-routing.module';

import { TransaksiBerhasilPage } from './transaksi-berhasil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransaksiBerhasilPageRoutingModule
  ],
  declarations: [TransaksiBerhasilPage]
})
export class TransaksiBerhasilPageModule {}
