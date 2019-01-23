import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'todo-filter',
    templateUrl: './todo-filter.component.html'
})
export class TodoFilterComponent
{
    constructor(
        private _router: Router
    ) { }

    public filter(form: NgForm): void
    {
        this._router.navigate([], { queryParams: { ...form.value } });
    }
}