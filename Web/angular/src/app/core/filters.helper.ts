import { HttpRequest, HttpParams } from '@angular/common/http';

class RemoveHelper
{
    constructor() { }

    public params<T>(req: HttpRequest<T>): HttpParams
    {
        let params: HttpParams = new HttpParams();

        req.params.keys().map(param =>
        {
            if (req.params.get(param) != undefined) {
                params = params.append(param, req.params.get(param));
            }
        });

        return params;
    }
}

export class Filters
{
    constructor() { }

    public static remove(): RemoveHelper
    {
        return new RemoveHelper();
    }
}