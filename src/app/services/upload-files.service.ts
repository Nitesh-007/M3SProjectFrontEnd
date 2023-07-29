import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private baseUrl = "http://192.168.12.143:8082/mentor/upload/";

  headerDict = {
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(private http: HttpClient) { }

  upload(file: FileList, id: any): Observable<any> {
    const formData: FormData = new FormData();

    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    return this.http.post(this.baseUrl + id, formData, this.requestOptions);
  }

  getFileUrl = "http://192.168.12.143:8082/mentor/files/"

  getFiles(id: any) {
    return this.http.get(this.getFileUrl + id);
  }

  // ------------------------------------------mentee-upload-------------------------------------------------------


  private baseUrl1 = "http://192.168.12.143:8082/mentee/upload/";

  upload1(file: FileList, id: any): Observable<any> {
    const formData: FormData = new FormData();

    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    return this.http.post(this.baseUrl1 + id, formData, this.requestOptions);
  }

    // const req = new HttpRequest('POST', `${this.baseUrl1}` + id, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    // console.log('data', file);

    // return this.http.post(this.baseUrl1 + id, formData, this.requestOptions1);
    // return this.http.request(req);
  // }

  getFileUrl1 = "http://192.168.12.143:8082/mentee/files/"

  getFiles1(id: any) {
    return this.http.get(this.getFileUrl1 + id);
  }
}
