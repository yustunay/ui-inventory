import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Injectable } from '@angular/core';
import { OrderComponent, OrderItem } from 'src/app/order/order.component';
import { BasicAuthenticationService } from '../basic-authentication.service';
import { Constants } from 'src/app/app.constants';


@Injectable({
  providedIn: 'root'
})
export class WebsocketapiService {
  stompClient: any;
  orderComponent: OrderComponent
  token: any;

  constructor(private authenticationService: BasicAuthenticationService){}

  _connect() {

    this.token = {Authorization: `${this.authenticationService.getAuthenticatedToken()}`};
    
    console.log("Initialize WebSocket Connection");
      let ws = new SockJS(Constants.SOCKET_API_URL); //,null,{ headers: this.token}
      this.stompClient = Stomp.over(ws); //,{ debug: false}
      const _this = this;

      _this.stompClient.connect(this.token, function (frame) { 
          _this.stompClient.subscribe(this.constants.SOCKET_TOPIC, function (sdkEvent) {
               _this.onMessageReceived(sdkEvent.body);
          },this.token);
          //_this.stompClient.reconnect_delay = 2000;
      }, this.errorCallBack);
  };

  _disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
          console.log("Disconnected");
          this.orderComponent.setMessageOnAlertBar("Disconnected")
      }
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
      console.log("errorCallBack -> " + error)
      setTimeout(() => {
          this._connect();
      }, 5000);
  }

/**
* Send message to server via web socket
* @param {*} message 
*/
  _send(message) {
      console.log("calling logout api via web socket");
      this.stompClient.send("/app/hello", JSON.stringify(message));
  }

  //{"Authorization":`${this.authenticationService.getAuthenticatedToken()}`}, 
  
  onMessageReceived(orderItem:OrderItem) {
       this.orderComponent.handleMessage(orderItem);
  }
}
