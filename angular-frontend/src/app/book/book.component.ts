import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

	searchTerm: string = "Harry";
	searchOffset: number = 0;
	numHits: number = 0;
	searchResults: any[] = [];
	paragraphs: any[] = [];
	searchDebounce: any = null;
	errorMessage: String = "";
	bookOffset: number = 0;
	selectedParagraph: any = null;

	constructor(private searchService: SearchService) {
	}

	ngOnInit() {
		this.getData(this.searchTerm,this.searchOffset);
	}

	search(term: string): void {
		debounceTime(300);
		setTimeout(async () => {
			this.searchOffset = 0
			if (term !== ''){
				this.getData(term,this.searchOffset);
			}
			
		}, 100)
	}

	getData(searchTerm,searchOffset) {
		this.searchResults = [];
		let apiData = new Promise((resolve, reject) => {
			this.searchService.search(searchTerm,searchOffset).subscribe((data: any) => {
				if (data.hits.hits.length > 0) {
					this.numHits = data.hits.total;
					resolve(data.hits.hits);
				}
				else {
					this.errorMessage = "No games on this date";
					setTimeout(() => {
						this.errorMessage = "";
						return false;
					}, 3000);
				}
			})
		}).catch((err) => {
			console.log(err);
		});
		apiData.then((fromResolve) => {
			this.searchResults = this.searchResults.concat(fromResolve);

		})
	}

	showBookModal(searchHit, offset) {
		this.paragraphs = [];
		this.selectedParagraph = searchHit;
		let apiData = new Promise((resolve, reject) => {
			this.searchService.getParagraphs(searchHit._source.title, offset - 5).subscribe((data: any) => {
				if (data.hits.hits.length > 0) {
					console.log("Get data")
					this.bookOffset = offset - 5;
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
		})
	}

	nextResultsPage(){
		if (this.numHits > 10){
			this.searchOffset += 10;
			if (this.searchOffset + 10 > this.numHits) { this.searchOffset = this.numHits - 10}
			this.getData(this.searchTerm,this.searchOffset);
		}
	}

	prevResultsPage () {
		this.searchOffset -= 10;
		if (this.searchOffset < 0) { this.searchOffset = 0 }
		this.getData(this.searchTerm,this.searchOffset);
	}

	addStrongTag(s: String){
		return s.replace("<em>","<strong><em>").replace("</em>","</em></strong>")
	}

	prevBookPage(){
		this.showBookModal(this.selectedParagraph,this.bookOffset - 10);
	}

	nextBookPage(){
		this.showBookModal(this.selectedParagraph, this.bookOffset + 10)
	}

	closeBookModal(){
		this.selectedParagraph = null;
	}

	
}