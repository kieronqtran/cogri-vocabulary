import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@app/shared';
import { WordRoutingModule } from './word-routing.module';
import { WordService } from './services/word.service';
import { CrudComponent } from './containers/crud.component';
import { WorkPreviewListComponent } from './components/work-preview-list/work-preview-list.component';
import { MatTableModule } from '@angular/material';
import { reducers } from './reducers';
import { CollectionEffects } from './effects/collection.effects';
import { EffectsModule } from '@ngrx/effects';
import { WordListEffects } from './effects/word-list.effects';
import { UpdateDialogComponent } from './containers/update-dialog/update-dialog.component';
import { DeleteDialogComponent } from './containers/delete-dialog/delete-dialog.component';
import { CreateDialogComponent } from './containers/create-dialog/create-dialog.component';
import { WordFormComponent } from './components/word-form/word-form.component';

const FEATURE_NAME = 'words';

@NgModule({
  imports: [
    MatTableModule,
    SharedModule,
    WordRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([CollectionEffects, WordListEffects]),
  ],
  declarations: [
    CrudComponent,
    WorkPreviewListComponent,
    UpdateDialogComponent,
    DeleteDialogComponent,
    CreateDialogComponent,
    WordFormComponent,
  ],
  providers: [WordService],
  entryComponents: [
    UpdateDialogComponent,
    DeleteDialogComponent,
    CreateDialogComponent,
  ],
})
export class WordModule {}
