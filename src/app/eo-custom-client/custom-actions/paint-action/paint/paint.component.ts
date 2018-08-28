import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {CanvasWhiteboardComponent, CanvasWhiteboardOptions} from 'ng2-canvas-whiteboard';
import {ActionComponent} from '@eo-sdk/client';
import {EnaioEvent} from '@eo-sdk/core';
import {PluginsService} from '@eo-sdk/client';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'eo-paint',
  template: `
    <eo-dialog [title]="'Paint'"
           [visible]="true"
           [minWidth]="1000"
           [minHeight]="630"
           #dialog>
      <section>
        <div class="canvas-container" [style.minWidth.px]="700" [style.height.px]="1000">
          <canvas-whiteboard #canvasWhiteboard
                             [options]="canvasOptions"
                             [imageUrl]="imgUrl"
                             (onSave)="onCanvasSave($event)">
          </canvas-whiteboard>
        </div>
      </section>
    </eo-dialog>
  `,
  styles: [`
  ::ng-deep .canvas_whiteboard_buttons,
  ::ng-deep .canvas_whiteboard_button
  { background: rgba(255,255,255,0.2); color:#000; }`
  ]
})
export class PaintComponent implements OnInit, ActionComponent {

  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;

  selection: any[];
  finished: EventEmitter<any> = new EventEmitter();
  canceled: EventEmitter<any> = new EventEmitter();
  canvasOptions: CanvasWhiteboardOptions;
  imgUrl: string;
  api: any;
  static isSubAction = true;

  constructor(private pluginService: PluginsService, private http: HttpClient) {
    this.api = pluginService.getApi();
  }

  ngOnInit() {
    this.canvasOptions = {
      drawButtonEnabled: true,
      drawButtonClass: 'drawButtonClass',
      drawButtonText: 'Draw',
      clearButtonEnabled: true,
      clearButtonClass: 'clearButtonClass',
      clearButtonText: 'Clear',
      undoButtonText: 'Undo',
      undoButtonEnabled: true,
      redoButtonText: 'Redo',
      redoButtonEnabled: true,
      colorPickerEnabled: true,
      saveDataButtonEnabled: true,
      saveDataButtonText: 'Save',
      lineWidth: 4,
      scaleFactor: 1,
      shouldDownloadDrawing: false
    };
    this.imgUrl = `${this.api.config.get().serviceBase}/dms/${this.selection[0].id}/content?type=${this.selection[0].typeName}`;
  }

  onCanvasSave(e) {
    let uri = this.imgUrl.replace('content?', 'contents?');
    this.canvasWhiteboard.generateCanvasBlob((blob: any) => {
      blob.name = 'Bild';
      let files = [blob];
      this.upload(uri, files)
        .then(() => {
          return this.api.dms.getObject(this.selection[0].id, this.selection[0].typeName);
        })
        .then(dmsObject => {
          this.api.events.trigger(EnaioEvent.DMS_OBJECT_UPDATED, dmsObject);
          this.finished.emit();
        });
    }, 'image/png');
  }

  upload(uri: string, files: File[]) {
    let formData = new FormData();
    for (let file of files) {
      formData.append('files[]', file, this.api.util.encodeFileName(file.name));
    }
    return this.http.post(uri, formData).toPromise();
  }

}
