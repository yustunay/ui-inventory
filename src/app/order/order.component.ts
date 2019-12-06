import { Component, OnInit } from '@angular/core';
import { WebsocketapiService } from '../service/websocket/websocketapi.service';

export class OrderItem {
  constructor(
    public barcode: string,
    public productName: string,
    public quantity: number
  ) {
  }
}

export class Order {
  constructor(
    public name: string,
    public description: string,
    public orderItems: Array<OrderItem>
  ){}
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private order: Order;
  private orderItems : Array<OrderItem> = []

  constructor(private websocketapiService: WebsocketapiService) {
    this.websocketapiService.orderComponent=this;
  }
  greeting: any;
  name: string;
  message: string;

  ngOnInit() {
    this.order = new Order("","",[])
    this.message = "Click \"Start Scanning\" button to start order entering process!";
  }

  connect() {
    this.websocketapiService._connect();
  }

  disconnect() {
    this.websocketapiService._disconnect();
  }

  sendMessage() {
    this.websocketapiService._send(this.name);
  }

  handleMessage(message: any) {
    let orderItem = <OrderItem>JSON.parse(message)
    if (orderItem.productName === "NOT_FOUND") {
      this.setMessageOnAlertBar("Barcode number does not match with any barcode in product list! Barcode number : "+orderItem.barcode);
    } else {
      this.setMessageOnAlertBar("New message has been received from server! Barcode number : "+orderItem.barcode);
      let isExist = false;
      this.orderItems.forEach(element => {
        if (element.barcode === orderItem.barcode) {
          element.quantity++;
          isExist = true;
        }
      });

      if (!isExist) {
        this.orderItems.push(orderItem)
      }
    }

    //console.log("Result : "+a.barcode);
    //this.greeting = message;
  }

  setMessageOnAlertBar(message: any) {
    this.message = message;
  }

  deleteOrder(i){
     console.log("Delete order item in index: "+i);
     this.orderItems.splice(i,1);
  }

}
