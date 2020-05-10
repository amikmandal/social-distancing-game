import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild("game")
  private gameCanvas: ElementRef;

  private context: any;
  private socket: any;

  public ngOnInit() {
    this.socket = io("https://localhost:3000");
  }

  public ngAfterViewInit() {
    this.context = this.gameCanvas.nativeElement.getContext("2d");
    this.context.beginPath();
    this.context.arc(640, 360, 10, 0, 2 * Math.PI);
    this.context.fill();
  }


}
