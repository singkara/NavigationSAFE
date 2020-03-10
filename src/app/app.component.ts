import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HereMapComponent } from "./here-map/here-map.component";

declare var H: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private platform: any;
    public start: string;
    public finish: string;
    


    @ViewChild("map", { static: false })
    public mapElement: HereMapComponent;

    public constructor() {
        this.platform = new H.service.Platform({
            "app_id": "tcbcpvI5wjeLFwJzS6U4",
            "app_code": "2Tbul36EIo-mMNjeShHk5g"            
        });
        this.start = "43.673640,-79.497160";
        this.finish = "43.771912,-79.467728";
    }





}