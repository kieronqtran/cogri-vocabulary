import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Word } from '../../models/word';

@Component({
  selector: 'anms-work-preview-list',
  templateUrl: './work-preview-list.component.html',
  styleUrls: ['./work-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkPreviewListComponent {
  @Input() words: Word[] = [];
  @Output() tableScroll = new EventEmitter();
  @Output() deleteBtn = new EventEmitter<string>();
  @Output() updateBtn = new EventEmitter<string>();

  displayedColumns = ['index', 'word', 'vietnameseMeaning', 'action'];

  onTableScroll(e) {
    const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      this.tableScroll.emit();
    }
  }

  onDeleteBtnClick(e: string) {
    this.deleteBtn.emit(e);
  }

  onUpdateBtnClick(e: string) {
    this.updateBtn.emit(e);
  }
}
