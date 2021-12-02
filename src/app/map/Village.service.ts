  import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { scan, debounce, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VillageService {

  private villageService: string = "http://localhost:7001"

  public OwnerId: number = 1;

  public SelectedVillage: number = 1;

  private VillageCache: villageDTO[];

  public UnitData: UnitDTO[] = [
    new UnitDTO({id: 1, name: 'axe'}),
    new UnitDTO({id: 2, name: 'sword'}),
    new UnitDTO({id: 3, name: 'bow'}),
  ];


  private VillageMockData = [
    new villageDataDTO({id: 1, OwnerId: 1,  x: 2, y: 4, name: 'cake', units: [0, 200, 0]}),
    new villageDataDTO({id: 2, OwnerId: 1,  x: 4, y: 4, name: 'cake second', units: [150, 30, 20]}),
    new villageDataDTO({id: 3, OwnerId: 2, x: -1, y: 5, name: 'wood', units: [120, 80, 0]}),
    new villageDataDTO({id: 4, OwnerId: 2, x: -3, y: 1, name: 'wood', units: [20, 250, 0]})
  ]

  constructor(private http: HttpClient) { }

  private lastRequest: number = 0;

  public GetVillages(): readonly villageDTO[]
  {
    
    
    if(this.lastRequest + 10000 < + new Date())
    {
      this.lastRequest = + new Date();
      let result = this.http.get<Array<villageDTO>>(this.villageService + "/api/Village").subscribe(x => console.log(x));
    }

    return this.VillageMockData.map(x => x as villageDTO);
  }

  public GetVillageData(id: number)
  {
    return this.VillageMockData.find(x => x.id == id);
  }


  

}


export class villageDTO
{
  public id: number = 0;
  public x: number = 0;
  public y: number = 0;
  public name: string = "";
  public OwnerId: number = 0;
  
  public constructor(init?:Partial<villageDTO>) {
    Object.assign(this, init);
  }
}

export class villageDataDTO extends villageDTO
{

  public units: number[] = [];
  
  public constructor(init?:Partial<villageDataDTO>) {
    super(init);
    Object.assign(this, init);
  }
}

export class UnitDTO
{
  public id: number = 0;
  public name: string = "";
  public imageUrl: string = "";

  // TODO: add stats here

  public constructor(init?:Partial<UnitDTO>) {
    Object.assign(this, init);
  }
}