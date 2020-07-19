import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  TaskServiceProxy,
  TaskDto
  
} from '@shared/service-proxies/service-proxies';
import { CreateTaskDialogComponent } from './create-task/create-task-dialog.component';
import { UpdateTaskDialogComponent } from './edit-task/edit-task-dialog.component';
//
class PagedTasksRequestDto extends PagedRequestDto {
 keyword: string;
}
//
@Component({
  templateUrl: './tasks.component.html',
  animations: [appModuleAnimation()]
})
export class TasksComponent extends PagedListingComponentBase<TaskDto> {
  task: TaskDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _tasksService: TaskServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedTasksRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._taskService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: TaskDtoPagedResultDto) => {
        this.task = result.items;
    //    this.showPaging(result, pageNumber);
      });
  }

  createTask(): void {
    this.showCreateTaskDialog();
  }

  updateTask(task: TaskDto): void {
    
    //update only one field ie. the state of the task
   // onclick
  }

  showCreateTaskDialog(): void {
    let showCreateTaskDialog: BsModalRef;
    createTask = this._modalService.show(
        CreateTaskDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            //id: id,
          },
        }
      );
    }

    showCreateTaskDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
