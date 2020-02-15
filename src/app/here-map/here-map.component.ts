import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Input } from '@angular/core';

declare var H: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit, OnChanges {

    @ViewChild("map")
    public mapElement: ElementRef;

    @Input()
    public appId: any;

    @Input()
    public appCode: any;

    @Input()
    public start: any;

    @Input()
    public finish: any;

    @Input()
    public width: any;

    @Input()
    public height: any;

    public directions: any;

    private platform: any;
    private map: any;
    private router: any;
    public constructor() { }

    public ngOnInit() {
        this.platform = new H.service.Platform({
            "app_id": this.appId,
            "app_code": this.appCode
        });
        this.directions = [];
        this.router = this.platform.getRoutingService();
    }

    public ngAfterViewInit() {
        let defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 4,
                center: { lat: "37.0902", lng: "-95.7129" }
            }
        );
        this.route(this.start, this.finish);
    }

    public ngOnChanges(changes: SimpleChanges) {
        if((changes["start"] && !changes["start"].isFirstChange()) || (changes["finish"] && !changes["finish"].isFirstChange())) {
            this.route(this.start, this.finish);
        }
    }    
    public route(start: any, finish: any) {
        let params = {
            "mode": "fastest;car",
            "waypoint0": "geo!" + this.start,
            "waypoint1": "geo!" + this.finish,
            "representation": "display"
        }
        this.map.removeObjects(this.map.getObjects());
        this.router.calculateRoute(params, data => {
            if(data.response) {
                this.directions = data.response.route[0].leg[0].maneuver;
                data = data.response.route[0];
                let lineString = new H.geo.LineString();
                data.shape.forEach(point => {
                    let parts = point.split(",");
                    lineString.pushLatLngAlt(parts[0], parts[1]);
                });
                let routeLine = new H.map.Polyline(lineString, {
                    style: { strokeColor: "blue", lineWidth: 5 }
                });
                let startMarker = new H.map.Marker({
                    lat: this.start.split(",")[0],
                    lng: this.start.split(",")[1]
                });
                let finishMarker = new H.map.Marker({
                    lat: this.finish.split(",")[0],
                    lng: this.finish.split(",")[1]
                });
                this.map.addObjects([routeLine, startMarker, finishMarker]);
                this.map.setViewBounds(routeLine.getBounds());
            }
        }, error => {
            console.error(error);
        });
    }
}
