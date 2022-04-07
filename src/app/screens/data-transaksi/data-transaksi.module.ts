import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataTransaksiPageRoutingModule } from './data-transaksi-routing.module';

import { DataTransaksiPage } from './data-transaksi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataTransaksiPageRoutingModule
  ],
  declarations: [DataTransaksiPage]
})
export class DataTransaksiPageModule {}
