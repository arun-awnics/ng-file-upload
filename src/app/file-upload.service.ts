import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEventType, HttpProgressEvent} from '@angular/common/http';

@Injectable()
export class FileUploadService{

  constructor(
    private readonly http: HttpClient,
  ) { }

  uploadAndProgress(files: FileList){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    
    return this.http.post<any>('https://file.io', formData, {reportProgress: true, observe: 'events'});
  }

  calcProgressPercent(event: HttpProgressEvent){
    return Math.round(100 * event.loaded / event.total);
  }
}