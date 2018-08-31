import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EoFrameworkModule} from '@eo-sdk/client';
import {ActionModule} from '@eo-sdk/client';
import {BaseAction} from '@eo-sdk/client';
import {FinalizeObjectActionComponent} from './finalize-object-action/finalize-object-action.component';
import {PaintActionComponent} from './paint-action/paint-action.component';
import {PaintComponent} from './paint-action/paint/paint.component';
import {CanvasWhiteboardModule} from 'ng2-canvas-whiteboard';

export const entryComponents: BaseAction[] = [
  FinalizeObjectActionComponent,
  PaintComponent,
  PaintActionComponent,
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    CanvasWhiteboardModule,
    ActionModule.forRoot(entryComponents)
  ],
  declarations: [FinalizeObjectActionComponent, PaintActionComponent, PaintComponent],
  exports: [ActionModule]
})
export class CustomActionsModule {
}
