import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";
import {TravelArea, TravelAreaService} from "../../../../service/travel-area.service";
import {HotelService} from "../../../../service/hotel.service";

@Component({
  selector:"section-1",
  templateUrl:"section-1.component.html",
})
export class Section1Component implements OnInit{
  travelAreaList:TravelArea[]=[];
   @Output() onSelectLocation=new EventEmitter<TravelArea>();


  constructor(private travelAreaService:TravelAreaService,private hotelService:HotelService) {
  }
  test="";
  onSelect(selectElement:string) {
    this.hotelService.searchByLocation(selectElement);
    if(selectElement==="All")return;
    for (let travelArea of this.travelAreaList) {
          if(selectElement===travelArea.areaName){
    this.onSelectLocation.emit(travelArea);
    sessionStorage.setItem("location",JSON.stringify(travelArea));
            break;
          }
    }
  }

  ngOnInit(): void {
    const location:string | null= sessionStorage.getItem("location");
    this.travelAreaList=this.travelAreaService.travelAreaList;
    this.travelAreaService.travelAreaData.subscribe(data=>{
      this.travelAreaList=data;
    });
    if(location){
      const locationDetail:TravelArea=JSON.parse(location);
      this.travelAreaList= this.travelAreaList.filter(area=> area.areaName!==locationDetail.areaName);
    this.travelAreaList.unshift(locationDetail);
    this.onSelectLocation.emit(locationDetail);
    }else{
    this.travelAreaList.unshift({travelAreaID:0,areaName:"Location",fullKM:0});
    }

  }

}
