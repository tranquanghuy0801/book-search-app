import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	baseUrl: string = environment.apiUrl
	searchTerm: string = "Harry"
	searchResult: Array<string> = []
	numHits: number = null
	searchOffset: number = 0



	constructor( private Http: HttpClient) { }

	search() {
		let headers = new HttpHeaders()
		headers = headers.append('Content-Type', 'application/json')
		let params = new HttpParams();
		params = params.append("term",this.searchTerm).append("offset",this.searchOffset.toString());
		return this.Http.get(this.baseUrl + '/search',{ params: params});
	}

	getParagraphs(bookTitle, offset) {
		let start = offset;
		let end = offset + 10;
		let params = new HttpParams();
		params = params.append("bookTitle",bookTitle).append("start",start.toString()).append("end",end.toString());
		return this.Http.get(this.baseUrl + '/paragraphs',{ params: params});
	}




}
