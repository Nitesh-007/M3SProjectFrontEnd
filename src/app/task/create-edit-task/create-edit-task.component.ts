import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { numberFormat } from 'highcharts';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { MenteeServiceService } from '../../services/mentee-service.service';
import { UploadFilesService } from '../../services/upload-files.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { saveAs } from 'file-saver';
import b64toBlob from 'b64-to-blob';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { invalid } from '@angular/compiler/src/render3/view/util';




@Component({
  selector: 'app-create-edit-task',
  templateUrl: './create-edit-task.component.html',
  styleUrls: ['./create-edit-task.component.css'],

})
export class CreateEditTaskComponent implements OnInit {

  @ViewChild('comment1')
  comment1!: ElementRef;


  taskCondition: any;
  userData: any;
  dropMentee: any = [];
  projectsCode: any = [];
  dropPriority: any = [];
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  fileInfos: any;
  element: any;
  dataTask: boolean = false;
  _selectedTaskView: any = null;
  _idView: any = null;
  userViewData: any;
  utype: any;
  msg: any;
  file1: any[] = [];
  previews: string[] = [];
  comment: any;
  editMode: any;
  viewMode: any;
  result: string = "";
  minDate: any = "";
  minStartDate: any = "";
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  dateData: any = "";
  events: string[] = [];
  public isDropdownDisabled = false;
  viewStatus: any;
  mentorComment: string = '';
  commentStatus: boolean = false;

  constructor(private http: MenteeServiceService,
    private uploadService: UploadFilesService,
    private _snackBar: MatSnackBar,
    private dilogRef: MatDialogRef<CreateEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

    this.getDate();
    this.taskCondition = "New Task";
    this.menteeDrop();
    this.proCode();
    this.taskPriorityDrop()

    if (this.data && this.data.id && this.data.action === 'VIEW') {
      this.ViewTask();
    }
    else if (this.data && this.data.id) {
      this.editTask();
    }


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }


  viewInEdit() {

    this.viewMode = false
    this.editTask()
    this.createTask.controls['projectCode'].enable();
    this.createTask.controls['assignedDate'].enable();
    this.createTask.controls['expectedSubmissionDate'].enable();
    this.createTask.controls['assignTo'].enable();
    this.createTask.controls['taskPriorityList'].enable();
    this.createTask.controls['taskName'].enable();
    this.createTask.controls['taskDescription'].enable();

  }

  getDate() {
    var date: any = new Date();
    var toDate: any = date.getDate();
    if (toDate < 10) {
      toDate = "0" + toDate;
    }
    var month: any = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = date.getFullYear();
    this.minDate = year + "-" + month + "-" + toDate
  }

  addEvent(event: any) {
    // console.log(event.value);
    var date1: any = event.value;
    var toDate: any = date1.getDate();
    if (toDate < 10) {
      toDate = "0" + toDate;
    }
    var month: any = date1.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = date1.getFullYear();
    this.minStartDate = year + "-" + month + "-" + toDate
    // console.log(this.minStartDate)
  }


  editTask() {
    this._idView = this.data.id
    this.taskCondition = "Edit Task";
    this.editMode = this.data;
    this.isDropdownDisabled = false;
    this.createTask.controls['marksObtained'].setValidators([Validators.required]);
    this.createTask.controls['marksObtained'].updateValueAndValidity()

    this.uploadService.getFiles(this.data.id).subscribe((res: any) => {
      this.fileInfos = res
    })

    if (this.data.id) {
      this.dataTask = !this.dataTask

      this.http.editGetTask(this.data.id).subscribe((data: any) => {
        this.userData = data.data;

        this.selectedItems = this.userData.assignTo

        for (let item of Object.keys(this.userData)) {
          if (this.createTask.controls[item]) {
            this.createTask.controls[item].setValue((this.userData[item]).toString());
          }
        }
      });
    }
    else {

    }
  }

  // getfiles() {
  //   this.uploadService.getFiles(this.data.id).subscribe((res: any) => {
  //     this.fileInfos = res.filedata
  //   })
  //   const blob = b64toBlob(this.fileInfos);
  //   saveAs(blob);
  //   console.log(blob);
  // }

  createTask = new FormGroup({
    taskStatusList: new FormControl('Pending', [Validators.required]),
    projectCode: new FormControl('', [Validators.required]),
    assignedDate: new FormControl('', [Validators.required]),
    expectedSubmissionDate: new FormControl('', [Validators.required]),
    assignTo: new FormControl('', [Validators.required]),
    taskPriorityList: new FormControl('', [Validators.required]),
    taskName: new FormControl('', [Validators.required]),
    taskDescription: new FormControl('', [Validators.required]),
    marksObtained: new FormControl('', [])
  })

  get projectCode() {
    return this.createTask.get('projectCode');
  }
  get assignedDate() {
    return this.createTask.get('assignedDate');
  }
  get expectedSubmissionDate() {
    return this.createTask.get('expectedSubmissionDate');
  }
  get assignTo() {
    return this.createTask.get('assignTo');
  }
  get taskPriorityList() {
    return this.createTask.get('taskPriorityList');
  }
  get taskName() {
    return this.createTask.get('taskName');
  }


  ViewTask() {
    this.isDropdownDisabled = true;
    this._idView = this.data.id;
    this.taskCondition = "View Task";
    this.viewMode = this.data;
    this.formDisable();

    if (this.data.id) {
      this.http.taskView(this.data.id).subscribe((data: any) => {
        this.userViewData = data.data;

        this.viewStatus = this.userViewData.taskStatusList

        this.selectedItems = this.userViewData.assignTo

        this.uploadService.getFiles(this.data.id).subscribe((res: any) => {
          this.fileInfos = res;
          console.log(this.fileInfos);
        });

        this.http.taskCommentGet(this.data.id).subscribe((res: any) => {
          this.comment = res;
        })

        for (let item of Object.keys(this.userViewData)) {
          if (this.createTask.controls[item]) {
            this.createTask.controls[item].setValue((this.userViewData[item]).toString());
          }
        }
      });
    } else { }
  }

  formDisable() {
    this.createTask.controls['projectCode'].disable();
    this.createTask.controls['assignedDate'].disable();
    this.createTask.controls['expectedSubmissionDate'].disable();
    this.createTask.controls['assignTo'].disable();
    this.createTask.controls['taskPriorityList'].disable();
    this.createTask.controls['taskName'].disable();
    this.createTask.controls['taskDescription'].disable();
  }

  formCreate() {
    this.createTask.controls['projectCode'].value;
    this.createTask.controls['assignedDate'].value;
    this.createTask.controls['expectedSubmissionDate'].value;
    this.createTask.controls['assignTo'].value;
    this.createTask.controls['taskPriorityList'].value;
    this.createTask.controls['taskName'].value;
    this.createTask.controls['taskDescription'].value;
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  onSaveComment(data: any) {
    this.mentorComment = data;
    this.commentStatus = true;
    var payload = {
      taskId: this.data.id,
      comments: data
    }
    this.http.taskCommentPost(payload, this.utype).subscribe((res: any) => {
      // this.http.taskCommentGet(this.data.id).subscribe((res: any) => {
      //   this.comment = res;
      // })
      this._snackBar.open('Comment Save Successfully', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['green-snackbar']
      });
    })
    this.http.taskCommentGet(this.data.id).subscribe((res: any) => {
      this.comment = res;
    })
    data = '';
    this.comment1.nativeElement.value = "";
  }


  onCreateTask() {
    if (this.editMode) { // Edit Task
      
      this.onUpdateTask();
      this.uploadFiles(this.data.id)
      this.dilogRef.close("Save");
      this.http.filter("Save");
    }
    else {

      
      const startDate = this.createTask.controls['assignedDate'].value;
      const endDate = this.createTask.controls['expectedSubmissionDate'].value;

      var d = new Date(startDate);
      d.setHours(d.getHours() + 5);
      d.setMinutes(d.getMinutes() + 30);
      console.log(d);

      var e = new Date(endDate);
      e.setHours(e.getHours() + 5);
      e.setMinutes(e.getMinutes() + 30);
      console.log(e);

      this.createTask.value.assignedDate = d;
      this.createTask.value.expectedSubmissionDate = e;


      var emp_type = JSON.parse(localStorage.getItem("currentUser") || '{}');
      this.utype = emp_type.email;
      this.http.addNewTask(this.createTask.value, this.utype).subscribe((response: any) => {
        this.dilogRef.close("Create");
        this.http.filter("Create");

        this._snackBar.open('Task is created successfully', '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',

          panelClass: ['green-snackbar']
        });
        this.uploadFiles(response.taskId);
      })

      // }
    }
  }


  onUpdateTask() {
    this.http.editPutTask(this.createTask.value, this.data.id).subscribe((response) => {
      this.http.filter("save");
      this._snackBar.open('Task is updated successfully', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['green-snackbar']
      });
    });
  }

  // onViewPutTask() {
  //   this.http.taskViewPut(this.createTask.value, this._selectedTaskView).subscribe((response) => {
  //     this._snackBar.open(' Save successfully', '', {
  //       duration: 3000,
  //       verticalPosition: 'top',
  //       horizontalPosition: 'center',

  //       panelClass: ['green-snackbar']
  //     });
  //   })
  // }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.file1 = event.target.files;
    for (var i = 0; i < this.file1.length; i++) {
      this.result += " " + this.file1[i].name + "," + " "
    }

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  uploalCancle() {
    this.result = '';
    this.previews = []
  }

  removeImage(i: number) {
    this.previews.splice(i, 1)
  }

  upload(id: number): void {

    if (this.selectedFiles) {

      this.uploadService.upload(this.selectedFiles, id).subscribe(
        (event: any) => {

          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[0].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.msg = 'Uploaded the file successfully';
            this.message.push(this.msg);
          }
        },
        (err: any) => {
          this.progressInfos[0].value = 0;
          const msg = 'Could not upload the file';
          this.message.push(msg);
        });
    }
  }

  uploadFiles(id: any): void {
    this.message = [];
    this.upload(id);
  }

  proCode() {
    this.http.projectCode().subscribe((responce) => { this.projectsCode = responce })
  }

  menteeDrop() {
    var emp_type = JSON.parse(localStorage.getItem("currentUser") || '{}');
    this.utype = emp_type.email;
    this.http.dropMentee(this.utype).subscribe((responce: any) => { this.dropMentee = responce.data })
  }

  taskPriorityDrop() {
    this.http.priorityTask().subscribe((responce) => { this.dropPriority = responce })
  }

  someMethod() {
    this.isDropdownDisabled = true;
  }

}

