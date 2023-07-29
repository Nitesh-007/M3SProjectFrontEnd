import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MenteeServiceService } from '../../services/mentee-service.service';
import { UploadFilesService } from '../../services/upload-files.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-task-resolve',
  templateUrl: './task-resolve.component.html',
  styleUrls: ['./task-resolve.component.css']
})
export class TaskResolveComponent implements OnInit {

  @ViewChild('comment')
  comment!: ElementRef;

  dropMentee: any = [];
  projectsCode: any = [];
  dropPriority: any = [];
  userViewData: any;
  selectedFiles?: FileList;
  fileInfos?: any;
  file1: any[] = [];
  result: string = "";
  comment1: any = [];
  progressInfos: any[] = [];
  previews: string[] = [];
  message: string[] = [];
  utype: any;
  msg: any;

  mentorComment: string = '';
  commentStatus: boolean = false;



  refreshComment$ = new BehaviorSubject<boolean>(true);

  constructor(private http: MenteeServiceService,
    private uploadService: UploadFilesService,
    private _snackBar: MatSnackBar,
    private dilogRef: MatDialogRef<TaskResolveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.proCode();
    this.taskPriorityDrop()

    if (this.data) {
      this.viewTask()
    }

  }


  // getCommentsData(){
  //   this.http.getComment(this.data).subscribe((res: any) => {
  //     this.comment1 = res;
  //   })
  // }


  viewDisableFields() {
    this.AddEmp.controls['projectCode'].disable();
    this.AddEmp.controls['startDate'].disable();
    this.AddEmp.controls['endDate'].disable();
    this.AddEmp.controls['reporter'].disable();
    this.AddEmp.controls['taskPriority'].disable();
    this.AddEmp.controls['taskTopic'].disable();
    this.AddEmp.controls['taskDescription'].disable();
    this.AddEmp.controls['marksObtained'].disable();
  }

  viewTask() {
    if (this.data) {
      this.http.menteeTaskView(this.data).subscribe((data: any) => {
        this.userViewData = data.data;

        this.viewDisableFields();

        this.uploadService.getFiles1(this.data).subscribe((res: any) => {
          this.fileInfos = res;
          console.log(this.fileInfos);

        });
        this.http.getComment(this.data).subscribe((res: any) => {
          this.comment1 = res;
        })

        for (let item of Object.keys(this.userViewData)) {
          if (this.AddEmp.controls[item]) {
            this.AddEmp.controls[item].setValue((this.userViewData[item]).toString());
          }
        }
      });
    } else { }
  }

  onViewPut() {
    this.http.menteeTaskViewPut(this.AddEmp.value, this.data).subscribe((res) => {
      this.dilogRef.close("Save");
      this.http.filter("Save");
      this._snackBar.open('Task save successfully', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['green-snackbar']
      });
    })
    if (this.selectedFiles) {
      this.uploadFiles(this.data);
    }
  }





  onSaveComment(data: any) {
    this.mentorComment = data;
    this.commentStatus = true;
    var emp_type = JSON.parse(localStorage.getItem("currentUser") || '{}');
    this.utype = emp_type.email;
    var payload = {
      taskId: this.data,
      comments: data
    }
    this.http.postComment(payload, this.utype).subscribe((res) => {
      // this.http.getComment(this.data).subscribe((res: any) => {
      //   this.comment1 = res;
      // })

      this._snackBar.open('Comment Save Successfully', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',

        panelClass: ['green-snackbar']
      });
    })
    this.http.getComment(this.data).subscribe((res: any) => {
      this.comment1 = res;
    })
    data = '';
    this.comment.nativeElement.value = "";

  }

  AddEmp = new FormGroup({
    taskStatusList: new FormControl('', [Validators.required]),
    projectCode: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    reporter: new FormControl('', [Validators.required]),
    taskPriority: new FormControl('', [Validators.required]),
    taskTopic: new FormControl('', [Validators.required]),
    marksObtained: new FormControl('', [Validators.required]),
    taskDescription: new FormControl('', [Validators.required])
  })

  get taskStatusList() {
    return this.AddEmp.get('taskStatusList');
  }


  proCode() {
    this.http.projectCode().subscribe((responce) => { this.projectsCode = responce, console.log(this.projectsCode) })
  }


  taskPriorityDrop() {
    this.http.priorityTask().subscribe((responce) => { this.dropPriority = responce, console.log(this.dropPriority) })
  }



  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.file1 = event.target.files;
    for (var i = 0; i < this.file1.length; i++) {
      this.result += this.file1[i].name + ","
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

      this.uploadService.upload1(this.selectedFiles, id).subscribe(
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

}
