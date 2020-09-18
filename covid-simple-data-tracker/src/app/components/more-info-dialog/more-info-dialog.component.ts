import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoreInfo } from 'src/app/services/data.service';

@Component({
  selector: 'app-more-info-dialog',
  templateUrl: './more-info-dialog.component.html',
  styleUrls: ['./more-info-dialog.component.scss'],
})
export class MoreInfoDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MoreInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MoreInfo
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
