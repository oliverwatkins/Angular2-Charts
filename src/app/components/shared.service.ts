import {Injectable} from '@angular/core';
// import {Subject} from "rxjs";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operator/map';

@Injectable()
export class SharedService {
    dataArray: string[] = [];

    // Observable string sources
    private missionAnnouncedSource = new Subject<string>();
    private missionConfirmedSource = new Subject<string>();

    // Observable string streams
    missionAnnounced$ = this.missionAnnouncedSource.asObservable();
    missionConfirmed$ = this.missionConfirmedSource.asObservable();


    // Service message commands
    announceMission(mission: string) {
        this.missionAnnouncedSource.next(mission);
    }
    confirmMission(astronaut: string) {
        this.missionConfirmedSource.next(astronaut);
    }


    myString: string;
    insertData(data: string){
        this.dataArray.unshift(data);
    }
    insertData2(data: string){

        alert('2  ')
        this.myString = data;
    }
}