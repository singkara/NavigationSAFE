import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var H: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private platform: any;

    @ViewChild("map")
    public mapElement: ElementRef;

    public constructor() {
        this.platform = new H.service.Platform({
            "app_id": "APP-ID-HERE",
            "app_code": "APP-CODE-HERE"
        });
    }

    public ngOnInit() { }

    public ngAfterViewInit() {
        let defaultLayers = this.platform.createDefaultLayers();
        let map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 10,
                center: { lat: 37.7397, lng: -121.4252 }
            }
        );
    }

}