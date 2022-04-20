import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { LaporanService } from './laporan.service';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.page.html',
  styleUrls: ['./laporan.page.scss'],
})
export class LaporanPage implements OnInit, ViewWillEnter {

  form: FormGroup;
  data: any = null;

  constructor(
    private service: LaporanService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      namaKafe: this.formBuilder.control(null),
      jumlahSaldoTransaksi: this.formBuilder.control(null),
      jumlahTransaksi: this.formBuilder.control(null),
      tahunPenjualan: this.formBuilder.control(null)
    });
  }

  ionViewWillEnter(): void {
    this.form.patchValue({
      jumlahSaldoTransaksi: 0,
      jumlahTransaksi: 0,
    });
    this.service.findData().subscribe(response => {
      this.data = response.body;
      this.form.patchValue({
        namaKafe: response.body.namaKafe,
        jumlahSaldoTransaksi: response.body.jumlahSaldoTransaksi,
        tahunPenjualan: response.body.tahunPenjualan,
        jumlahTransaksi: response.body.jumlahTransaksi
      });
    });
  }

  ngOnInit() {
  }

}
