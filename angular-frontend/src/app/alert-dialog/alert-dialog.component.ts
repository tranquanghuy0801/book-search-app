import { Component, OnInit, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-alert-dialog',
	templateUrl: './alert-dialog.component.html',
	styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
	cancelButtonText = "Close"
	paragraphs: any[] = []
	selectedParagraph: any = ""
	bookOffset: number = 0

	constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<AlertDialogComponent>) {
		if (data) {
			if (data.paragraphs) {
				this.paragraphs = data.paragraphs || this.paragraphs;
			}
			if (data.selectedParagraph) {
				this.selectedParagraph = data.selectedParagraph || this.selectedParagraph;
			}
			if (data.bookOffset) {
				this.bookOffset = data.bookOffset || this.bookOffset;
			}
			// console.log("Paragraphs");
			// console.log(data.paragraphs);
			// console.log("selected para");
			// console.log(data.selectedParagraph);
		}
		this.dialogRef.updateSize('300vw','300vw')
	}

	ngOnInit() {
	}

}
