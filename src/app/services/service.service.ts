import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { HttpClient,HttpHeaders, HttpResponse}from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl: string =environment.URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers' :'Content-Type, Authorization'
    })
  };


  url = "http://192.168.12.143:8082/mentor/tasks/";

  menteesUrl = "http://192.168.12.143:8082/mentor/profiles/";
  
  monthlyUrl =  "http://192.168.12.143:8082/mentor/monthly-data/";

  weeklyUrl =  "http://192.168.12.143:8082/mentor/weekly-data/";


  static weekly: any;

  constructor(private http: HttpClient) { }

  mentor(email:any) {
    return this.http.get(this.url+ email)
  }

  menteesList(email:any)
  {
    return this.http.get(this.menteesUrl + email)
  }

  weekly(email:any)
  {
    return this.http.get(this.weeklyUrl + email)
  }

  monthly(email:any)
  {
    return this.http.get(this.monthlyUrl + email)
  }

}
