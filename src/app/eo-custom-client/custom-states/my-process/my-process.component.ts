import { Component } from '@angular/core';
import { PluginService, ProcessStateComponent } from '@eo-sdk/client';
import { Process, Utils } from '@eo-sdk/core';
import { map } from 'rxjs/operators';
import { ProcessTabComponent } from '../../custom-plugins/process-tab/process-tab.component';
import { ProcessFileTabComponent } from '../../custom-plugins/process-file-tab/process-file-tab.component';

const _getProcesses = ProcessStateComponent.prototype['getProcesses'];

const getProcesses = function(options, id) {
  let url = Utils.buildUri(`/api/dms/processes/${id}`, options || {});
  url = this.addFilterParamsToUrl(url);
  // url = this.addSortParamsToUrl(url);
  return this.backend.getJson(url, '/processservice')
    .pipe(
      map((response: any) => {
        const processes = response.content.map(item => {
          const process = new Process(item);
          process.creatorid = item.creatorId;
          process.modelid = item.modelId;
          process.starttime = item.startTime;
          process.endtime = item.endTime;
          return process;
        });
        response.processes = this.addIconUrl(processes);
        response.numberOfElements = response.processes.length;
        response.totalElements = response.processes.length;
        return response;
      }));
}

// override the getProcesses method for the custom page
ProcessStateComponent.prototype['getProcesses'] = function(options) {
  if (window.location.pathname === '/x' + MyProcessComponent.path) {
    const id = this.bpmService.capabilities.system.user.id;
    return getProcesses.call(this, options, id);
  } else {
    return _getProcesses.call(this, options);
  }
}

// ensure that the tab is only loaded on the custom page
const loadTabs = PluginService.prototype.loadTabs;
PluginService.prototype.loadTabs = function(type) {
  return loadTabs.call(this, type).filter(t => type.match(ProcessTabComponent.matchType) || type.match(ProcessFileTabComponent.matchType) ? window.location.pathname === '/' + MyProcessComponent.path : true);
}

@Component({
  selector: 'app-my-process',
  templateUrl: './my-process.component.html',
  styleUrl: './my-process.component.scss'
})
export class MyProcessComponent {

  static id = 'eo.custom.state.my-process';
  static path =  'custom/my-process';
  static matchType = new RegExp('sidebar-navigation');
  static component = ProcessStateComponent;

  }
