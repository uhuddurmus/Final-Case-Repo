import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { ConfirmDeleteComponent } from '../../../../components/confirm-delete/confirm-delete.component';
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
  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.orderService
      .getOrdersByToken(this.time, this.name, this.desc, this.status)
      .subscribe((response: any) => {
        this.data = response.response;
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
