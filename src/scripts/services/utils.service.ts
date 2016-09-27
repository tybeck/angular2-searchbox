'use strict';

import {
  Injectable
} from '@angular/core';

@Injectable()
export class UtilsService {

  public uuid (): string {

    let d = Date.now();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {

        var r = (d + Math.round(Math.random() * 16)) % 16 | 0;

        d = Math.floor(d / 16);

        return (c == 'x' ? r : (r & 0x3 | 0x8))
          .toString(16);

    });

  }

  public isJson (str: any): boolean {

    try {

      JSON.parse(str);

    } catch (e) {

      return false;

    }

    return true;

  }

  public removeObjectProperties (obj: any, props: any): void {

    for (var i = 0; i < props.length; i++) {

      if (obj.hasOwnProperty(props[i])) {

        delete obj[props[i]];

      }

    }

  }

  public getScrollbarWidth (): number {

    let scrollDiv = document.createElement('div');

    scrollDiv
      .classList
      .add('scrollbar-measure');

    document.body.appendChild(scrollDiv);

    let scrollbarWidth = (scrollDiv.offsetWidth - scrollDiv.clientWidth);

    document.body.removeChild(scrollDiv);

    return scrollbarWidth;

  }

  public isURL (url: string): boolean {

    var expression = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|' +

        '2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u' +

        '00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a' +

        '-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',

      regex = new RegExp(expression, 'i');

    return regex.test(url);

  }

}