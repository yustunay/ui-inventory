import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message = 'Some welcome message'
  welcomeMessageFromService: string
  name = ''

  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;

  constructor(private route: ActivatedRoute,
    private service: WelcomeDataService) {

  }

  ngOnInit() {
    //console.log(this.message)
    this.name = this.route.snapshot.params['name']
    //console.log(this.route.snapshot.params['name']) 
  }

  getWelcomeMessage() {
    console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

    console.log("last line of getWelcomeMessage");

    //console.log("get welcome message");
  }

  getWelcomeMessageWithParameter() {
    console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

    console.log("last line of getWelcomeMessage");

    //console.log("get welcome message");
  }

  handleErrorResponse(error) {
    this.welcomeMessageFromService = error.error.message
  }

  handleSuccessfulResponse(response) {
    this.welcomeMessageFromService = response.message
    //console.log(response.message);
  }

}
