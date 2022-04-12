import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransaksiBerhasilPage } from './transaksi-berhasil.page';

describe('TransaksiBerhasilPage', () => {
  let component: TransaksiBerhasilPage;
  let fixture: ComponentFixture<TransaksiBerhasilPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaksiBerhasilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransaksiBerhasilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
