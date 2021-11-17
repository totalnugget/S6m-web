  import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VillageService {

  public OwnerId: number = 1;

  public SelectedVillage: number = 1;

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

  constructor() { }

  public GetVillages(): readonly villageDTO[]
  {
    return this.VillageMockData.map(x => x as villageDTO);
  }

  public GetVillageData(id: number)
  {
    return this.VillageMockData.find(x => x.id == id);
  }


  

}


export class villageDTO
{
  public id: number;
  public x: number;
  public y: number;
  public name: string;
  public OwnerId: number;
  
  public constructor(init?:Partial<villageDTO>) {
    Object.assign(this, init);
  }
}

export class villageDataDTO extends villageDTO
{

  public units: number[];
  
  public constructor(init?:Partial<villageDataDTO>) {
    super(init);
    Object.assign(this, init);
  }
}

export class UnitDTO
{
  public id: number;
  public name: string;
  public imageUrl: string;

  // TODO: add stats here

  public constructor(init?:Partial<UnitDTO>) {
    Object.assign(this, init);
  }
}