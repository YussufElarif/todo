import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaginationQuery } from '@todo/shared/models';

@Component({
    selector: '[sharedAutoScroll]',
    templateUrl: './auto-scroll.component.html',
    styleUrls: ['./auto-scroll.component.scss']
})
export class SharedAutoScrollComponent
{
    @Input()
    public total: number;

    @Input()
    public offset: number;

    @Input()
    public limit: number;

    @Output()
    public pageChange: EventEmitter<PaginationQuery> = new EventEmitter<PaginationQuery>();

    constructor() { }

    public paginate(): void
    {
        this.offset = this.offset + this.limit;

        if (this.offset >= this.total) {
            return;
        }

        this.pageChange.emit({ offset: this.offset, limit: this.limit });
    }
}