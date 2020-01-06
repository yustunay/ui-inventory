import { Injectable } from '@angular/core';
import { RxStompService} from '@stomp/ng2-stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketapiService {

  constructor(private rxStompService: RxStompService) { }
}
