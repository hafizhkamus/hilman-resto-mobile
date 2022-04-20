import { NgxCurrencyModule } from 'ngx-currency';
import { LaporanService } from './laporan.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaporanPageRoutingModule } from './laporan-routing.module';

import { LaporanPage } from './laporan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaporanPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  declarations: [LaporanPage],
  providers : [LaporanService]
})
export class LaporanPageModule {}
