import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';

import { ConfirmDeleteComponent } from '../../../../components/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  data: any[] = [];
  time: any = '0';
  name = '';
  desc = '';
  status = '';
  id: any;
  donestatu = 'done';
  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private StorageService: StorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.StorageService.getUserInfo().id;
    this.load();
  }

  setToDone(id: any) {
    this.orderService.updateOrder(id, 'done').subscribe(
      (response) => {
        // Kaydetme işlemi başarılı olduysa yapılacak işlemler
        console.log('Product saved:', response);
        this.toastr.success('Changed');
        this.load();

        // Yönlendirme veya diğer işlemleri burada ekleyebilirsiniz
      },
      (error) => {
        // Hata durumunda yapılacak işlemler
        this.toastr.error('Error', error.message);
        console.log(error);
        this.load();
      }
    );
  }

  load() {
    this.orderService
      .getOrdersByToken(this.time, this.name, this.desc, this.status)
      .subscribe((response: any) => {
        this.data = response.response;
        console.log(this.data);
      });
  }

  updateTime(time: any) {
    this.time = time;
    console.log(this.time);
    this.load();
  }
  updateName(name: any) {
    this.name = name;
    this.load();
  }
  updateDesc(desc: any) {
    this.desc = desc;
    this.load();
  }
  updateStatus(status: any) {
    this.status = status;
    this.load();
  }

  isDelete(id: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService.deleteOrder(id).subscribe(() => {
          this.load();
        });
      }
    });
  }

  ngOnDestroy(): void {}
}
