  import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { scan, debounce, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VillageService {

  private villageService: string = "http://localhost:7001"

  public OwnerId: string = ">.<";

  public SelectedVillage: number = 1;

  private VillageCache: villageDTO[] = [];

  private VillageDataCache: villageDataDTO[];

  public UnitData: UnitDTO[] = [
    new UnitDTO({id: 1, name: 'axe'}),
    new UnitDTO({id: 2, name: 'sword'}),
    new UnitDTO({id: 3, name: 'spear'}),
    new UnitDTO({id: 4, name: 'cavalry'}),
  ];

  constructor(private http: HttpClient) { }

  private lastRequest: number = 0;

  public async GetVillages(): Promise<villageDTO[]>
  {
    
    
    if(this.lastRequest + 10000 < + new Date())
    {
      this.lastRequest = + new Date();
      this.VillageCache = await this.http.get<Array<villageDTO>>(this.villageService + "/api/Village").toPromise();
    }

    return this.VillageCache
  }

  public async GetVillageData(id: number): Promise<villageDataDTO>
  {
    let result = await this.http.get<villageDataDTO>(this.villageService + "/api/Village/" + id).toPromise();

    //result.unitCount

    return result;
  }
}


export class villageDTO
{
  public id: number = 0;
  public x: number = 0;
  public y: number = 0;
  public name: string = "";
  public ownerId: string = "";
  
  public constructor(init?:Partial<villageDTO>) {
    Object.assign(this, init);
  }
}

export class villageDataDTO extends villageDTO
{

  public unitCount: UnitAmountDTO[] = [];
  
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

export class UnitAmountDTO
{
  public unitId: number = 0;
  public amount: number = 0;

  // TODO: add stats here

  public constructor(init?:Partial<UnitAmountDTO>) {
    Object.assign(this, init);
  }
}