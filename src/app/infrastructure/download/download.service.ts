import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlobDto } from './dtos/blob-dto';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) {
  }

  public async downloadBlob(url: string): Promise<BlobDto> {
    const responseData = await this.http.get(url, {
        responseType: 'blob',
        headers: { skip: 'true' }
      }
    ).toPromise();

    return {
      filename: this.filenameFromUrl(url),
      blob: await this.blob2base(responseData)
    };
  }

  private filenameFromUrl(url: string): string {
    return url.replace(/^.*[\/]/, '');
  }

  private extensionFromUrl(url: string): string {
    return url.replace(/^.*[\.]/, '');
  }

  private async blob2base(blob: Blob): Promise<string> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }
}
