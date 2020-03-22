import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Input } from '@angular/core';
declare var H: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit, OnChanges {

    @ViewChild("map", { static: false })
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
    private geocodingService: any;

    public constructor() { }

    public ngOnInit() {
        this.platform = new H.service.Platform({
            "app_id": this.appId,
            "app_code": this.appCode
        });
        this.directions = [];
        this.router = this.platform.getRoutingService();
        this.geocodingService = this.platform.getGeocodingService();
        
    }
    private heavyAccidentAreas = [{ lat : 43.641664, lng: -79.375976 }, // Waterfront
        //{ lat : 43.747923, lng: -79.627957 }, // West Humber Claireville
        { lat : 43.657291, lng: -79.384302 }, // Bay Street Corridor
        { lat : 43.712449, lng: -79.292054 }, // Clairlea-Birchmount
        { lat : 43.763559, lng: -79.280425 }, // Dorset Park , 
        { lat : 43.742289, lng: -79.527437 }  // 400 Highway 

    ]; 

    public ngAfterViewInit() {
        let defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 5,
                center: { lat: "37.0902", lng: "-95.7129" }
            }
        );
        this.route(this.start, this.finish);
        for (let entry of this.heavyAccidentAreas) {
            this.highlightRegion(entry)
        }
    } 

    public ngOnChanges(changes: SimpleChanges) {
        if((changes["start"] && !changes["start"].isFirstChange()) || (changes["finish"] && !changes["finish"].isFirstChange())) {
            this.route(this.start, this.finish);
            let position = { lat : 43.757634, lng: -79.516820 };
            for (let entry of this.heavyAccidentAreas) {
                this.highlightRegion(entry)
            }        }
    }    

    public getPositionAt(x: number, y: number) {
        return this.map.screenToGeo(x, y);
    }    

    public highlightRegion(position: any) {
        let reverseGeocodingParameters = {
            prox: position.lat + "," + position.lng,
            mode: "retrieveAddresses",
            maxresults: "1",
            additionaldata: "IncludeShapeLevel,postalCode"
        };
        this.geocodingService.reverseGeocode(
            reverseGeocodingParameters,
            success => {
                let locations = success.Response.View[0].Result;
                let shape = locations[0].Location.Shape.Value; 
                let customStyle = {
                    strokeColor: "black",
                    fillColor: "rgba(0,175,170,0.5)",
                    lineWidth: 2,
                    lineJoin: "bevel"
                };
                let geometry = H.util.wkt.toGeometry(shape);
                if(geometry instanceof H.geo.MultiGeometry) {
                    let geometryArray = geometry.getGeometries();
                    for (let i = 0; i < geometryArray.length; i++) {
                        this.map.addObject(
                            new H.map.Polygon(
                                geometryArray[i].getExterior(),
                                { style: customStyle }
                            )
                        );
                    }
                } else {            
                    this.map.addObject(
                        new H.map.Polygon(
                            geometry.getExterior(),
                            { style: customStyle }
                        )
                    );
                } 
            },
            error => {
                console.error(error);
            }
        );
    }

    public route(start: any, finish: any) {


        let params = {
            "mode": "fastest;car",
            "waypoint0": "geo!" + this.start,
            "waypoint1": "geo!" + this.finish,
            "representation": "display"
            //,"avoidareas": "43.751806,-79.533354;43.746133,-79.525370"
            //,"avoidareas": "43.723230,-79.496415;43.718903,-79.484892"

            
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
