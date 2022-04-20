import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaporanService {

  constructor(
    private http: HttpClient
  ) { }

  public findData(){
    return this.http.get<any>(`${environment.baseUrl}/api/laporan-keuangan/get-data`, {observe : 'response'});
  }
}
