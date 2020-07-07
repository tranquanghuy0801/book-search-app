import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';

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
	debouncedInputValue = this.searchTerm;
	private searchDecouncer$: Subject<string> = new Subject();;

	constructor(private searchService: SearchService) {
	}

	ngOnInit() {

		// Setup debouncer
		this.setupSearchDebouncer();

		// Do initial search for 'darth'
		this.search(this.searchTerm);
	}

	public onSearchInputChange(term: string): void {
		// `onSearchInputChange` is called whenever the input is changed.
		// We have to send the value to debouncing observable
		this.searchDecouncer$.next(term);
	}

	private setupSearchDebouncer(): void {
		// Subscribe to `searchDecouncer$` values,
		// but pipe through `debounceTime` and `distinctUntilChanged`
		this.searchDecouncer$.pipe(
		  debounceTime(250),
		  distinctUntilChanged(),
		).subscribe((term: string) => {
		  // Remember value after debouncing
		  this.debouncedInputValue = term;
	
		  // Do the actual search
		  this.search(term);
		});
	}

	search(term: string): void {

		this.searchOffset = 0
		if (term !== '') {
			this.getData(term, this.searchOffset);
		}
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