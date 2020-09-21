import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoreInfo, TestingData } from 'src/app/models/models';

@Component({
  selector: 'app-more-info-dialog',
  templateUrl: './more-info-dialog.component.html',
  styleUrls: ['./more-info-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MoreInfoDialogComponent implements OnInit {
  moreInfo: MoreInfo;
  testingData: TestingData;

  constructor(
    public dialogRef: MatDialogRef<MoreInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.moreInfo = this.data.moreInfo;
      this.testingData = this.data.testingData;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
