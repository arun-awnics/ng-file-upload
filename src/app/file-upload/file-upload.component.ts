import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  imgUrl: string;
  public progress: number;
  private _control: FormControl;

  @Input() set control(value: FormControl) {
    this._control = value;
  }
  @Input() set controlName(name: string) {
    this._control = this.container.control.get(name) as FormControl;
  }

  constructor(
    private readonly fileService: FileUploadService,
    private readonly container: ControlContainer

  ) { }

  upload(files: FileList) {
    //set it to nothing since we're about to upload a new value
    //also this means that it'll be validated correclty
    this._control.setValue(null);

    this.fileService.uploadAndProgress(files)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = this.fileService.calcProgressPercent(event);
        } else if (event instanceof HttpResponse) {

          // the actual should be returned as something like
          // this._control.setValue(event.body.url)   
          console.log('event ', JSON.stringify(event));     
          this._control.setValue(event.body.link);
          console.log('url: ', event.body.link);
          //this.imgUrl = event.body.link;
        }
      });
  }
}
