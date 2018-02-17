import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEventType, HttpProgressEvent} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class FileUploadService{

  private readonly url = 'http://localhost:3000/fileUpload';

  constructor(
    private readonly http: HttpClient
  ) { }

  uploadAndProgress(files: FileList): Observable<any>{
    var formData = new FormData();
    Array.from(files).forEach(f => {
      formData.append('file',f);
    });
    return this.http.post(this.url,formData, {reportProgress: true, observe: 'events'});
  }

  calcProgressPercent(event: HttpProgressEvent){
    return Math.round(100 * event.loaded / event.total);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
}
}