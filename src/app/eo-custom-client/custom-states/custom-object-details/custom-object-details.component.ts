import { Component } from '@angular/core';
import {PluginsService, SelectionService} from '@eo-sdk/client';
import { SearchFilter, SearchService, SearchQuery, SystemService } from '@eo-sdk/core';

@Component({
  selector: 'app-custom-object-details',
  templateUrl: './custom-object-details.component.html',
  styleUrl: './custom-object-details.component.scss'
})
export class CustomObjectDetailsComponent {

  static id = 'eo.custom.state.custom-object-details';
  static path =  'custom/custom-object-details';
  static matchType = new RegExp('sidebar-navigation');

  constructor(private selection: SelectionService,
              private pluginsService: PluginsService,
              private searchService: SearchService,
              private systemService: SystemService) {
    const currentUser = this.pluginsService.api.session.getUser();
    const query = new SearchQuery();
    const personnelFileObjectType = this.systemService.getObjectType('personalakte');
    query.types.push(personnelFileObjectType);
    query.filters.push(new SearchFilter('personalakte.vorname', SearchFilter.OPERATOR.EQUAL, currentUser.firstname));
    query.filters.push(new SearchFilter('personalakte.name', SearchFilter.OPERATOR.EQUAL, currentUser.lastname));
    this.searchService.search(query).subscribe(res => {
      if (res.hits?.length) {
        this.selection.focus({id: res.hits[0].id});
      }
    });
  }
}
