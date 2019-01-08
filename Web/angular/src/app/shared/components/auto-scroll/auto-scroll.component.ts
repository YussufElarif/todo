import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
    public limit: number;

    @Input()
    public set loading(val: boolean)
    {
        this.offset = 0;
        this.disable = true;
    };

    @Output()
    public pageChange: EventEmitter<any> = new EventEmitter<any>();

    public offset: number = 0;

    public page: number = 0;

    public disable: boolean;

    constructor() { }

    public ngOnInit(): void
    {
        this.page = Math.ceil(this.total / this.limit);
    }

    public paginate(): void
    {
        console.log(this.offset, this.limit, this.total);

        this.offset = this.offset + this.limit;

        if (this.offset >= this.total) {
            return;
        }

        this.pageChange.emit({ offset: this.offset });
    }
}