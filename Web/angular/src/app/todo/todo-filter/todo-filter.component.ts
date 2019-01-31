import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'todo-filter',
    templateUrl: './todo-filter.component.html'
})
export class TodoFilterComponent
{
    constructor(
        private _router: Router
    ) { }

    public search(value: string): void
    {
        this.navigate({ search: value });
    }

    public navigate(filter: any): void
    {
        this._router.navigate([], { queryParams: filter });
    }
}