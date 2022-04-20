import { MenuService } from './../new-menu/menu.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { CartItem } from 'src/app/models/cart-item.model';
import { Food } from 'src/app/models/food.model';
import { Menu } from 'src/app/models/menu';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, ViewWillEnter {
  id: number;
  food: Menu;
  menu: Menu;
  views = false;

  form: FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private toastCtrl: ToastController,
    private service: MenuService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');

    this.form = this.formBuilder.group({
      namaNemu: this.formBuilder.control(null, [Validators.required]),
      idKategori: this.formBuilder.control(null, [Validators.required]),
      hargaSatuan: this.formBuilder.control(null, [Validators.required]),
      deskripsi: this.formBuilder.control(null, [Validators.required]),
      vol: this.formBuilder.control(null, [Validators.required])
    });

    this.form.get('hargaSatuan').setValue(0);
    // this.service.findMenuById(this.id).subscribe(data=>{
    //   // console.log(data.body);
    //   this.food = data.body;
    // });
  }

  ionViewWillEnter(): void {
    this.views = false;
    this.service.findMenuById(this.id).subscribe(data => {
      this.menu = data.body;
      this.form.patchValue({
        namaNemu: data.body.namaNemu,
        idKategori: data.body.idKategori,
        hargaSatuan: data.body.hargaSatuan,
        deskripsi: data.body.deskripsi,
        vol: data.body.vol
      });
      this.views = true;
    });
  }

  ngOnInit() {
    // this.food = this.foodService.getFood(this.id);
    // this.service.findMenuById(this.id).subscribe(data=>{
    //   this.food = data.body;
    // });
  }

  selectFile(event) {
    const filename = event.target.files[0].name;
    // $('#label-file').text(filename);
    document.getElementById('label-file').textContent = filename;
    this.selectedFiles = event.target.files;
  }

  addItemToCart() {
    const cartitem: CartItem = {
      id: this.food.id,
      name: this.food.namaNemu,
      price: this.food.hargaSatuan,
      image: '/appservice/api/menu/file/' + this.food.file,
      quantity: 1,
    };

    this.cartService.addToCart(cartitem);
    this.presentToast('food');
  }

  save() {
    if (this.form.valid) {
      // eslint-disable-next-line eqeqeq
      if (this.currentFile != undefined) {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        console.log(this.currentFile);
        const swalWithBootstrapButtons = Swal.mixin({
        });
        swalWithBootstrapButtons.fire({
          title: 'Anda Yakin',
          text: 'Menambahkan Menu Berupa ' + this.form.get('namaNemu').value + ' ?',
          type: 'warning',
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
          reverseButtons: true,
          confirmButtonColor: '#36c6d3',
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.value) {
            const user: Menu = this.form.value;
            user.id = this.id;
            this.service.upload(this.currentFile).subscribe(
              event => {
                if (event.type === HttpEventType.UploadProgress) {
                  this.progress = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                  console.log(event.body);
                  user.file = event.body.file;
                  this.service.update(user).subscribe(response => {
                    this.presentToast('Berhasil Edit Menu');
                    this.form.reset();
                    this.selectedFiles = undefined;
                    this.currentFile = undefined;
                    this.progress = 0;
                    this.router.navigate(['/menu']);
                  }, error => {
                    // eslint-disable-next-line eqeqeq
                    if (error.status == 200) {
                      this.presentToast('Berhasil Edit Menu');
                      this.form.reset();
                      this.progress = 0;
                      this.currentFile = undefined;
                      this.router.navigate(['/menu']);
                    } else {
                      this.presentToast('Gagal Edit Menu');
                      this.progress = 0;
                      this.currentFile = undefined;
                    }
                  });
                }
              },
              err => {
                this.progress = 0;
                this.currentFile = undefined;
                this.presentToast('Could not upload the file!');
              });
            this.progress = 0;
            this.currentFile = undefined;
          }
        });
      } else {
        const swalWithBootstrapButtons = Swal.mixin({
        });
        swalWithBootstrapButtons.fire({
          title: 'Anda Yakin',
          text: 'Menambahkan Menu Berupa ' + this.form.get('namaNemu').value + ' ?',
          type: 'warning',
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
          reverseButtons: true,
          confirmButtonColor: '#36c6d3',
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.value) {
            const user: Menu = this.form.value;
            user.id = this.id;
            user.file = this.menu.file;
            this.service.update(user).subscribe(response => {
              this.presentToast('Berhasil Edit Menu');
              this.form.reset();
              this.selectedFiles = undefined;
              this.currentFile = undefined;
              this.progress = 0;
              this.router.navigate(['/menu']);
            }, error => {
              // eslint-disable-next-line eqeqeq
              if (error.status == 200) {
                this.presentToast('Berhasil Edit Menu');
                this.form.reset();
                this.progress = 0;
                this.currentFile = undefined;
                this.router.navigate(['/menu']);
              } else {
                this.presentToast('Gagal Edit Menu');
                this.progress = 0;
                this.currentFile = undefined;
              }
            });
          }
        });
      }
    } else {
      this.presentToast('Form Tidak Valid');
    }
  }

  delete(){
    const swalWithBootstrapButtons = Swal.mixin({
    });
    swalWithBootstrapButtons.fire({
      title: 'Anda Yakin',
      text: 'Menghapus Menu dari Daftar ?',
      type: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      reverseButtons: true,
      confirmButtonColor: '#36c6d3',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.service.delete(this.menu).subscribe(response => {
          this.presentToast('Berhasil Menghapus Menu');
          this.router.navigate(['/menu']);
        }, error => {
          // eslint-disable-next-line eqeqeq
          if (error.status == 200) {
            this.presentToast('Berhasil Menghapus Menu');
            this.router.navigate(['/menu']);
          } else {
            this.presentToast('Gagal Menghapus Menu');
          }
        });
      }
    });
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      mode: 'ios',
      duration: 1000,
      position: 'top',
    });

    toast.present();
  }
}
