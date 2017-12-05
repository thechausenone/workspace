import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'titleLength' })
export class TitleLengthPipe implements PipeTransform {

  transform(title: String):String {
    if (title === null){
        return "";
    }
    else if (title.length > 15){
            return title.substring(0, 15) + "...";
    }
    return title;
  }
}