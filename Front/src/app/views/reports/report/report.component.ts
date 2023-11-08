import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  data: any[] = [];
  time: any = '0';
  id: any;
  donestatu = 'done';
  totalPrice: number = 0;
  totalPiece: number = 0;
  mostSaledProduct: any;
  totalDoneProducts: number = 0;
  totalWaitingProducts: number = 0;

  constructor(
    private StorageService: StorageService,
    private toastr: ToastrService,
    private reportService: ReportsService
  ) {}
  ngOnInit(): void {
    this.getTime(this.time);
  }
  ngOnDestroy(): void {}
  updateTime(time: any) {
    this.time = time;
    this.getTime(this.time);
  }
  findMostSaledProduct() {
    let maxPiece = 0;

    for (const item of this.data) {
      if (item.piece > maxPiece) {
        this.mostSaledProduct = item;
        maxPiece = item.piece;
      }
    }
  }
  calculateTotalDoneProducts() {
    this.totalDoneProducts = this.data.filter(
      (item) => item.status === 'done'
    ).length;
  }
  calculateTotalWaitingProducts() {
    this.totalWaitingProducts = this.data.filter(
      (item) => item.status === 'active'
    ).length;
  }
  getTime(time: number) {
    this.reportService.getReport(time).subscribe(
      (data) => {
        console.log('Rapor:', data);
        this.data = JSON.parse(data).response;
        console.log(this.data);
        this.totalPrice = this.data.reduce(
          (total, item) => total + item.price * item.piece,
          0
        );
        this.totalPiece = this.data.reduce(
          (total, item) => total + item.piece,
          0
        );
        this.findMostSaledProduct();
        this.calculateTotalDoneProducts();
        this.calculateTotalWaitingProducts();
      },
      (error) => {
        console.error('Rapor alınamadı:', error);
        // Hata işlemleri yapabilirsiniz.
      }
    );
  }
}
