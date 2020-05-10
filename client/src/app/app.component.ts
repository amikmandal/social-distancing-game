import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild("game")
  private gameCanvas: ElementRef;

  private context: any;

  public ngOnInit() {

  }

  public ngAfterViewInit() {
    this.context = this.gameCanvas.nativeElement.getContext("2d");
    this.context.fillRect(20, 20, 20, 20);
  }


}
