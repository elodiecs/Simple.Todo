import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  TaskServiceProxy,
  TaskDto,
  //CreateTaskDto,
  } from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-task-dialog.component.html',
  providers: [TaskServiceProxy]
})
export class CreateTaskDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  task = new TaskDto();
 // permissions: PermissionDto[] = [];
  //checkedPermissionsMap: { [key: string]: boolean } = {};
  //defaultPermissionCheckedStatus = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _taskService: TaskServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {


 }
  save(): void {
    this.saving = true;
    console.log("Form Submitted!");
   // const task = new Task();
    this.task.init(this.task);
   // task.grantedPermissions = this.getCheckedPermissions();

    this._taskService
      .createTask(this.task)
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
