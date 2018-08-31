import {Component, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {TranslateService, SearchService} from '@eo-sdk/core';
import {BaseChartDirective} from 'ng2-charts';
import {AppSearchService, UnsubscribeOnDestroy} from '@eo-sdk/client';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'eo-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent extends UnsubscribeOnDestroy {

  static id = 'eo.custom.state.custom';
  static path = 'custom/custom';
  static matchType = new RegExp('sidebar-navigation');

  groupCount: number;
  totalCount: number;
  chart;
  activeType = 0;
  types = [];

  @ViewChild(BaseChartDirective) chartEl: BaseChartDirective;

  constructor(private translate: TranslateService,
              private searchService: SearchService,
              private appSearchService: AppSearchService) {
    super();
    this.fetchData();
  }

  chartClicked(el?) {
    if (!el || (this.activeType === this.groupCount && el.active[0])) {
      this.activeType = el ? el.active[0]._index : this.groupCount;
      this.chart = this.dataToChart(this.types[this.activeType]);
      setTimeout(() => {
        this.chartEl.chart.config.data.labels = this.chart.labels;
        this.chartEl.chart.update();
      }, 0);
    }
  }

  dataToChart(groups: any[]): Chart {
    return {
      data: [{
        data: groups.map(g => g.count),
        label: ''
      }],
      labels: groups.map(g => g.label)
    };
  }


  private fetchData() {
    this.appSearchService.setTerm('');
    this.appSearchService
      .queryState$
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(res => {
          this.totalCount = res.count;
          this.groupCount = this.appSearchService.objectTypeGroups.length;
          this.types = [];

          const main = this.appSearchService.objectTypeGroups.map((g) => {
            const type = g.types.map(t => ({label: t.label, count: res.aggregations.type.get(t.qname) || 0}));
            this.types.push(type.sort((a, b) => b.count - a.count));
            return {
              label: g.label === '0' ? this.translate.instant('eo.quicksearch.result.group.global') : g.label,
              count: type.map(t => t.count).reduce((a, b) => a + b, 0)
            };
          });

          this.types.push(main.sort((a, b) => b.count - a.count));
          this.chartClicked();
        }
      );
  }
}

