import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UnitAmountDTO } from './Village.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private commandService: string = "http://localhost:7002"

  constructor(private http: HttpClient, private auth: AuthService) { }

  private lastRequest: number = 0;

  private commandsPerUser : { [id: string]: Command[] } = {};

  public async GetCommands(refresh: boolean = false): Promise<Command[]>
  {
    let userId = this.auth.getSubId();
    
    if(this.lastRequest + 10000 < +new Date() || refresh)
    {
      let commands = await this.http.get<Command[]>(this.commandService + "/api/command?arriveBefore=" + Number.MAX_SAFE_INTEGER).toPromise();
      this.lastRequest = +new Date();

      this.commandsPerUser[userId] = commands;
    }

    return this.commandsPerUser[userId] || []
  }

  public async CreateCommands(command : Command): Promise<Command>
  {
    let Createdcommand = await this.http.post<Command>(this.commandService + "/api/command", command).toPromise();
    
    return Createdcommand
  }

}

export class Command
{
  public ownerId : string

  public originVillageId : number

  public targetVillageId : number

  public unitCount : UnitAmountDTO[] = []

  public arrivalTime : number

  public startTime : number

  public isCompleted : boolean

  public type : string

  // TODO: add stats here

  public constructor(init?:Partial<Command>) {
    Object.assign(this, init);
  }
}
