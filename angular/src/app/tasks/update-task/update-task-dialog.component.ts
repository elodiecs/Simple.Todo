import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  TaskServiceProxy,
  TaskDto

} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'update-task-dialog.component.html'
})
export class UpdateTaskDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  task = new TaskDto();

  //permissions: FlatPermissionDto[];
  //grantedPermissionNames: string[];
  //checkedPermissionsMap: { [key: string]: boolean } = {};

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _taskService: TaskServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._taskService
      .getTasks(1,1)
      .subscribe(() => {
      
      });
  }

  save(): void {
    this.saving = true;

    
    this.task.init(this);
    

    this._taskService
      .updateTask(this.t)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
