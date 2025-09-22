import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  data: any;

  baseUrl: string = environment.URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })
  };
  /* configUrl:string =this.http://192.168.12.143:8082/user/login */

  constructor(private http: HttpClient) { }

  login(url: any, payload: any): Observable<any> {
    let reqUrl = `${this.baseUrl}${url}`;
    // let reqUrl = "http://localhost:3000/posts"
    return this.http.post(reqUrl, payload, this.httpOptions)
  }

  /* getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' });
  } */




  forgot(url: any, payload: any): Observable<any> {
    let reqUrl = ` ${this.baseUrl}${url}`;
    // let reqUrl ='./assets/dummy/login.json'
    return this.http.post(reqUrl, payload)

  }

  reset(url: any, payload: any): Observable<any> {
    let reqUrl = `${this.baseUrl}${url}`;
    // let reqUrl ='./assets/dummy/login.json'
    return this.http.post(reqUrl, payload)

  }


  otp(url: any, payload: any): Observable<any> {
    let reqUrl = `${this.baseUrl}${url}`;
    // let reqUrl ='./assets/dummy/login.json'
    return this.http.post(reqUrl, payload)

  }

  change(url: any, payload: any): Observable<any> {
    let reqUrl = `${this.baseUrl}${url}`;
    // let reqUrl ='./assets/dummy/login.json'
    return this.http.post(reqUrl, payload)

  }


  // for login user
  loginUser(token: any) {
    localStorage.setItem("token", token)
    return true;
  }

  // to check user is logged in or not 
  isloggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  // for logout the user
  logout() {
    localStorage.removeItem('token');
    return true;
  }

  // for getting the token
  getToken() {
    return localStorage.getItem("token")
  }



  menteesList() {
    // return this.http.get<any>("http://192.168.12.143:8082/admin/get-list-of/MENTEE/?length=4")
    // return this.http.get<any>("http://127.0.0.1:5000/mentee")
      return this.http.get<any>("https://m3sbackend.onrender.com/mentee")

   
  }


  mentor() {
    // return this.http.get<any>("http://192.168.12.143:8082/admin/get-list-of/MENTOR/?length=all")
    return this.http.get<any>("https://m3sbackend.onrender.com/allmentor")
  }

  // mentor(){
  //   return this.http.get<any>("http://172.16.34.173:8082/admin/get-list-of/MENTOR/?length=all")
  // }



  mentee() {
    // return this.http.get<any>("http://192.168.12.143:8082/admin/get-list-of/MENTEE/?length=all")
    return this.http.get<any>("https://m3sbackend.onrender.com/mentees")
  }
  // mentee(){
  //   return this.http.get<any>("http://172.16.34.173:8082/admin/get-list-of/MENTEE/?length=all")
  // }

  task() {
    // return this.http.get<any>("http://192.168.12.143:8082/admin/get-task-detail/")
    return this.http.get<any>("https://m3sbackend.onrender.com/taskdata")

  }

  chartData() {
    // return this.http.get<any>("http://192.168.12.143:8082/admin/overall-mentor-count-by-tech-group")
    return this.http.get<any>("https://m3sbackend.onrender.com/chart")
  }


  addUserData(data: any) {
    return this.http.post<any>("https://m3sbackend.onrender.com/employees", data)
      .pipe(
        tap(() => {
          this.refreshneeded.next()
        })

      )
  }

  menteesTaskData() {
    // return this.http.get<any>("http://192.168.12.143:8082/admin/get-overall-task-detail/MENTEE")
    return this.http.get<any>("https://m3sbackend.onrender.com/task")
  }
  mentorTaskData() {
    // return this.http.get<any>("http://192.168.12.143:8082/admin/get-overall-task-detail/MENTOR")
    return this.http.get<any>("https://m3sbackend.onrender.com/task")
  }

  editmentor(email: string) {

    // return this.http.get<any>("http://192.168.12.143:8082/admin/get-employee/" + email)
    // return this.http.get<any>("http://172.16.34.173:8082/admin/get-employee/" + email)
    return this.http.get<any>("https://m3sbackend.onrender.com/get_employee/"+email)
  }

  editmentee(email: string) {
    // return this.http.get<any>("http://192.168.12.143:8082/admin/get-employee/" + email)
    return this.http.get<any>("https://m3sbackend.onrender.com/get_employee/" + email)
  }

  deletementor(email: string) {
    // return this.http.delete<any>("http://192.168.12.143:8082/admin/delete-employee/" + email)
    return this.http.delete<any>("https://m3sbackend.onrender.com/delete_User/" + email) 
      .pipe(
        tap(() => {
          this.refreshneeded.next()
        })

      )
  }

  deletementee(email: string) {
    // return this.http.delete<any>("http://192.168.12.143:8082/admin/delete-employee/" + email)
    return this.http.delete<any>("https://m3sbackend.onrender.com/delete_User/" + email)
      .pipe(
        tap(() => {
          this.refreshneeded.next()
        })

      )
  }

  updatementorData(data: any, email: string) {
    // return this.http.put("http://192.168.12.143:8082/admin/do-partial-change/" + email, data)
    return this.http.put("https://m3sbackend.onrender.com/update_employee/"+email,data)

  }

  updatementeeData(data: any, email: string) {
    // return this.http.put("http://192.168.12.143:8082/admin/do-partial-change/" + email, data)
    return this.http.put("https://m3sbackend.onrender.com/update_employee/" + email, data)
  }

  getlocation() {
    // return this.http.get("http://192.168.12.143:8082/admin/get-location/")
    return this.http.get("https://m3sbackend.onrender.com/get_location")
  }

  getTechGroup(data: any) {
    // return this.http.get("http://192.168.12.143:8082/admin/get-tech-group-by-bussiness-unit/" + data)
    return this.http.get("https://m3sbackend.onrender.com/get_tech")
  }

  getBuDetails() {
    // return this.http.get("http://192.168.12.143:8082/admin/get-bussiness-unit/")
    return this.http.get("https://m3sbackend.onrender.com/get_Bu")
  }

  getDesignation() {
    // return this.http.get("http://192.168.12.143:8082/admin/get-designation")
    return this.http.get("https://m3sbackend.onrender.com/get_designation")
  }


  mentorProfile(email: any) {

    // return this.http.get<any>("http://192.168.12.143:8082/admin/get-employee/" + email)
    return this.http.get<any>("https://m3sbackend.onrender.com/profile/" + email)

  }

  menteeProfile(email: any) {

    // return this.http.get<any>("http://192.168.12.143:8082/admin/get-employee/" + email)
    return this.http.get<any>("https://m3sbackend.onrender.com/profile/" + email)

  }

  AdminProfile(email: any) {

    // return this.http.get<any>("http://192.168.12.143:8082/admin/get-employee/" + email)
    return this.http.get<any>("https://m3sbackend.onrender.com/profile/" + email)

  }
  assignmenteeList(email: any) {

    return this.http.get<any>("https://m3sbackend.onrender.com/admin/get-unassigned-mentees/" + email)

  }




  AssigneMentee(payload: any) {
    return this.http.post<any>("https://m3sbackend.onrender.com/admin/mentor-mentee-mapping", payload)
      .pipe(
        tap(() => {
          this.refreshneeded.next()
        })

      )
  }


  unAssignementee(payload: any) {
    return this.http.post<any>("https://m3sbackend.onrender.com/admin/remove-mentor-mentee-mapping", payload)
      .pipe(
        tap(() => {
          this.refreshneeded.next()
        })

      )

  }


  refreshneeded = new Subject<void>();
  get_refreshneeded() {
    return this.refreshneeded
  }













}




