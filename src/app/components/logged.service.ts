import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ChartInfo } from './chart-info';

@Injectable()
export class LoggedService {

    private logged: ChartInfo;
    private subject: Subject<ChartInfo> = new Subject<ChartInfo>();

    setLogged(logged: ChartInfo): void {
        this.logged = logged;
        this.subject.next(logged);
        // alert('set logged')
    }

    getLogged(): Observable<ChartInfo> {
        // alert('get logged')
        return this.subject.asObservable();
    }
}