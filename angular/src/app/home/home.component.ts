import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  TaskServiceProxy,
  GetTasksOutput
} from '@shared/service-proxies/service-proxies';
import { CreateTaskDialogComponent } from '../tasks/create-task/create-task-dialog.component';
import { UpdateTaskDialogComponent } from '../tasks/update-task/update-task-dialog.component';
import { TasksComponent } from '../tasks.component';

@Component({
  selector: 'home.component',
  providers: [TaskServiceProxy],
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent extends AppComponentBase {
GetTasksOutput = new GetTasksOutput();
  tasks: TasksDto[] ;
   public count: number;
   constructor(
    injector: Injector,
    private _taskService: TaskServiceProxy,
    private _modalService: BsModalService,
   ) {
    super(injector);
  }
  /*

  //
  
   list(
    request: PagedTasksRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._taskService
      .getTasks(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: TaskDtoPagedResultDto) => {
        this.tasks = result.items;
        this.showPaging(result, pageNumber);
      });
  
 };
 
  public createTask(): void {
    this.showCreateTaskDialog();
  }

  
  showCreateTaskDialog(): void {
 // let showCreateTaskDialog: BsModalRef;
  //  createTask = this._modalService.show(
   //     CreateTaskDialogComponent,
   //     {
    //      class: 'modal-lg',
     //     initialState: {
            //id: id,
      //    },
      //  }
   //   );
}


    */
	 public updateTask(task: TaskDto):void{
	  console.log(task.id);
	  }

       OnInit(): void {  

 count  = 25; //GetActiveTaskCount();

};


      
      }

