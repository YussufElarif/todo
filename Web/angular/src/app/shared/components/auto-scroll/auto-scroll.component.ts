import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationQuery } from '@todo/shared/models';

@Component({
    selector: '[sharedAutoScroll]',
    templateUrl: './auto-scroll.component.html',
    styleUrls: ['./auto-scroll.component.scss']
})
export class SharedAutoScrollComponent implements OnInit
{
    @Input()
    public total: number;

    @Input()
    public offset: number;

    @Input()
    public limit: number;

    @Output()
    public pageChange: EventEmitter<PaginationQuery> = new EventEmitter<PaginationQuery>();

    public page: number = 0;

    constructor() { }

    public ngOnInit(): void
    {
        this.page = Math.ceil(this.total / this.limit);
    }

    public paginate(): void
    {
        this.offset = this.offset + this.limit;

        if (this.offset >= this.total) {
            return;
        }

        this.pageChange.emit({ offset: this.offset, limit: this.limit });
    }
}