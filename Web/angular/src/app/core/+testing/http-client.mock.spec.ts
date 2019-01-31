import { Observable, of } from 'rxjs';

export class HttpClientMock
{
    public get(): Observable<any>
    {
        return of();
    }

    public put(): Observable<any>
    {
        return of();
    }

    public post(): Observable<any>
    {
        return of();
    }

    public delete(): Observable<any>
    {
        return of();
    }
}