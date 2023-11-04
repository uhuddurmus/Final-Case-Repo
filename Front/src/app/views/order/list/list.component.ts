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
  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.orderService.getOrdersByToken(this.time).subscribe((response: any) => {
      this.data = response.response;
      console.log(this.data);
    });
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