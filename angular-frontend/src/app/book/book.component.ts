import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

	searchResults: any[] = [];
	paragraphs: any[] = [];
	errorMessage: String = "";
	searchControl: FormControl;
	bookOffset: number = 0;
	selectedParagraph: any = null;

	constructor(private searchService: SearchService,private dialog: MatDialog) {
		this.searchControl = new FormControl('');
	}

	ngOnInit() {
		this.getData();
	}

	getData() {
		let apiData = new Promise((resolve, reject) => {
			this.searchService.search().subscribe((data: any) => {
				if (data.hits.hits.length > 0) {
					console.log("Get data")
					resolve(data.hits.hits);
				}
				else {
					console.log("Not found data")
					this.errorMessage = "No games on this date";
					setTimeout(() => {
						this.errorMessage = "";
						return false;
					}, 3000);
				}
			})
		});
		apiData.then((fromResolve) => {
			this.searchResults = this.searchResults.concat(fromResolve)
			// console.log(this.searchResults[0].highlight.text[0]);

		});
	}

	showBookModal(searchHit: any) {
		this.selectedParagraph = searchHit;
		let apiData = new Promise((resolve, reject) => {
			this.searchService.getParagraphs(searchHit._source.title, searchHit._source.location - 5).subscribe((data: any) => {
				if (data.hits.hits.length > 0) {
					console.log("Get data")
					this.bookOffset = searchHit._source.location - 5;
					resolve(data.hits.hits);
				}
				else {
					console.log("Not found data")
					this.errorMessage = "No games on this date";
					setTimeout(() => {
						this.errorMessage = "";
						return false;
					}, 3000);
				}
			})
		});
		apiData.then((fromResolve) => {
			this.paragraphs = this.paragraphs.concat(fromResolve)
			console.log(this.paragraphs);
		})
	}

	addStrongTag(s: String){
		return s.replace("<em>","<strong><em>").replace("</em>","</em></strong>")
	}

	closeBookModal(){
		this.selectedParagraph = null;
	}

	// openAlertDialog(paragraphs,selectedParagraph,bookOffset)  {
	// 	const dialogRef = this.dialog.open(AlertDialogComponent,{
	// 		data:{
	// 		  buttonText: {
	// 			cancel: 'Close'
	// 		  },
	// 		  paragraphs: paragraphs,
	// 		  selectedParagraph: selectedParagraph,
	// 		  bookOffset: bookOffset
	// 		},
	// 	});
	// }

	
}