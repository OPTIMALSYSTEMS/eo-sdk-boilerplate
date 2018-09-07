import {Component, OnInit} from '@angular/core';
import {SearchService, SearchQuery, SearchResult} from '@eo-sdk/core';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import {takeUntil, filter} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '@eo-sdk/client';
import {SimplePreviewComponent} from '../simple-preview/simple-preview.component';

@Component({
  selector: 'eo-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.scss']
})
export class SimpleListComponent extends UnsubscribeOnDestroy implements OnInit {

  static id = 'eo.custom.state.simple-list';
  static path = 'custom/simple-list';
  static matchType = new RegExp('sidebar-navigation');

  /* set specific existing query to provide correct link */
  /* multiple ways how to set query based on input format */
  // static queryParams = {query : '%7B%22types%22%3A%5B%22eoxemail%22%5D%7D'};
  // static queryParams = {query : decodeURIComponent('%257B%2522types%2522%253A%255B%2522eoxemail%2522%255D%257D')};
  static queryParams = {query: encodeURIComponent(JSON.stringify({'types': ['eoxemail']}))};

  query: SearchQuery;
  searchResult: SearchResult = new SearchResult();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private searchService: SearchService) {
    super();
  }


  getParams() {
    this.route
      .queryParams
      .pipe(takeUntil(this.componentDestroyed$), filter(params => params.query))
      .subscribe((params: any) => {
        this.query = JSON.parse(decodeURIComponent(params.query));
        const defaultQuery = this.searchService.buildQuery(this.query);

        this.searchService
          .getChunkedResult(defaultQuery, 0, 10000)
          .subscribe(result => {
            this.searchResult = result;
          });
      });
  }

  onDoubleClick(event) {
    const {id, version, typeName} = event.data;
    const queryParams: NavigationExtras = {queryParams: {id, version, 'type': typeName}};
    const url = this.router.createUrlTree([SimplePreviewComponent.path], queryParams).toString();
    window.open(url);

  }

  ngOnInit() {
    this.getParams();
  }

}

