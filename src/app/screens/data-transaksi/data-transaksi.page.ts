import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Data } from '@angular/router';

@Component({
  selector: 'app-data-transaksi',
  templateUrl: './data-transaksi.page.html',
  styleUrls: ['./data-transaksi.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTransaksiPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;

  constructor(
    private http: HttpClient
  ) {
    this.columns = [
      { name: 'Name' },
      { name: 'Company' },
      { name: 'Genre' }
    ];
    this.http.get<Data>('assets/dummy.json')
      .subscribe((res) => {
        console.log(res);
        this.rows = res.movies;
      });
   }

  ngOnInit() {
  }

}
