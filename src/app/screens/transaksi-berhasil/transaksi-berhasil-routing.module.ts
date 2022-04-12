import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransaksiBerhasilPage } from './transaksi-berhasil.page';

const routes: Routes = [
  {
    path: '',
    component: TransaksiBerhasilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransaksiBerhasilPageRoutingModule {}
