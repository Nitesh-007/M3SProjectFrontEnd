import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenteeServiceService {

  post: any;

  constructor(private mentee: HttpClient) { }

  // ------------------------ For mentee module -----------------------------------------

  url = "http://192.168.12.143:8082/mentee/get-all-task-of-mentee/";

  weeklyUrl = "http://192.168.12.143:8082/mentee/get-week-data/";

  monthlyUrl = "http://192.168.12.143:8082/mentee/get-monthly-data/";

  listingDataUrl = "http://192.168.12.143:8082/mentee/get-list-task-of-mentee/"
  //  "http://localhost:5500/mentee-listing-data.json";

  taskViewGetUrl = "http://192.168.12.143:8082/mentee/get-view-task-of-mentee/"
  // "http://localhost:5500/edittask.json";

  taskViewPutUrl = "http://192.168.12.143:8082/mentee/update-task-status/"

  CommentsUrl = "http://192.168.12.143:8082/mentee/view-tasks/comments/";

  CommentsGetUrl = "http://192.168.12.143:8082/mentee/view-tasks/comments/";



  menteeTask(email: string) {
    return this.mentee.get(this.url + email)
    .pipe(
      tap(()=>{
        this.refreshneeded.next()
      })
      
    )
  }

  weekly(email: string) {
    return this.mentee.get(this.weeklyUrl + email)
    .pipe(
      tap(()=>{
        this.refreshneeded.next()
      })
      
    )
  }

  monthly(email: string) {
    return this.mentee.get(this.monthlyUrl + email)
    .pipe(
      tap(()=>{
        this.refreshneeded.next()
      })
      
    )
  }

  menteeTaskList(email: string) {
    // return this.mentee.get(this.listingDataUrl)
    return this.mentee.get(this.listingDataUrl + email)
    .pipe(
      tap(()=>{
        this.refreshneeded.next()
      })
      
    )
  }

  menteeTaskView(id: number) {
    // return this.mentee.get(this.taskViewGetUrl)
    return this.mentee.get(this.taskViewGetUrl + id)
  }

  menteeTaskViewPut(data:any, id: number) {
    // return this.mentee.get(this.taskViewGetUrl)
    return this.mentee.put(this.taskViewPutUrl + id, data)
  }

  

  getComment(id: any) {
    // return this.mentee.get(this.CommentsUrl)
    return this.mentee.get(this.CommentsGetUrl+id)
    .pipe(
      tap(()=>{
        this.refreshneeded.next()
      })
      
    )
  }

  postComment(data: any, email: string) {
    return this.mentee.post(this.CommentsUrl + email, data)
    .pipe(
      tap(()=>{
        this.refreshneeded.next()
      })
      
    )
  }

  // -------------------------- For task page in mentor module ---------------------------------

  listingTaskUrl = "http://192.168.12.143:8082/mentor/all-task-lists/";

  newTaskUrl = "http://192.168.12.143:8082/mentor/new-tasks/";

  menteeDrop = "http://192.168.12.143:8082/mentor/new-tasks/assigned-mentees/"

  projectCodeUrl = "http://192.168.12.143:8082/mentor/new-tasks/project-codes";

  taskPriorityUrl = "http://192.168.12.143:8082/mentor/new-tasks/task-priority-lists";

  taskDeleteUrl = "http://192.168.12.143:8082/mentor/delete-tasks/";

  allTaskDeleteUrl = "http://192.168.12.143:8082/mentor/delete-multiple-tasks/";

  taskViewUrl = "http://192.168.12.143:8082/mentor/view-tasks/";

  taskPutEditUrl = "http://192.168.12.143:8082/mentor/edit-tasks/";

  taskGetEditUrl = "http://192.168.12.143:8082/mentor/edit-tasks/";
  // "http://localhost:5500/edittask.json"

  viewCommentsUrl = "http://192.168.12.143:8082/mentor/view-tasks/comments/";

  viewCommentsGetUrl = "http://192.168.12.143:8082/mentor/view-tasks/comments/";

  listTaskData(email: any) {
    // return this.mentee.get(this.listingTaskUrl)
    return this.mentee.get(this.listingTaskUrl + email)
    .pipe(
      tap(()=>{
        this.refreshneeded.next()
      })
      
    )
  }

  deleteTask(id: any) {
    return this.mentee.delete(this.taskDeleteUrl + id)
    .pipe(
      tap(()=>{
        this.refreshneeded.next()
      })
      
    )
  }

  deleteAllTask(id:any[]) {
    return this.mentee.delete(this.allTaskDeleteUrl + id)
  }

  addNewTask(data: any, email: string) {
    return this.mentee.post(this.newTaskUrl + email, data)
  }

  dropMentee(email:string) {
    return this.mentee.get(this.menteeDrop + email)
  }

  projectCode() {
    return this.mentee.get(this.projectCodeUrl)
  }

  priorityTask() {
    return this.mentee.get(this.taskPriorityUrl)
  }

  editGetTask(id: any) {
    // return this.mentee.get(this.taskGetEditUrl )
    return this.mentee.get(this.taskGetEditUrl + id)
  }

  editPutTask(data:any, id:any){
    return this.mentee.put(this.taskPutEditUrl+id, data)
    .pipe(
      tap(()=>{
        this.refreshneeded.next()
      })
      
    )
  }

  taskView(id: any) {
    // return this.mentee.get(this.taskGetEditUrl )
    return this.mentee.get(this.taskViewUrl + id)
  }

  taskViewPut(data:any, id:any){
    return this.mentee.put(this.taskViewUrl+id, data)
    .pipe(
      tap(()=>{
        this.refreshneeded.next()
      })
      
    )
  }

  taskCommentPost(value: any, email:string) {
    return this.mentee.post(this.viewCommentsUrl+email, value)
    .pipe(
      tap(()=>{
        this.refreshneeded.next()
      })
      
    )
  }

  taskCommentGet(id: any) {
    return this.mentee.get(this.viewCommentsGetUrl+id)
    .pipe(
      tap(()=>{
        this.refreshneeded.next()
      })
      
    )
  }

  refreshneeded=new Subject<void>();
  get_refreshneeded(){
   return this.refreshneeded
  }


  private _listners = new Subject<any>();
  listen():Observable<any>{
    return this._listners.asObservable();
  }
  filter(filterBy: string){
    this._listners.next(filterBy);
  }

}
