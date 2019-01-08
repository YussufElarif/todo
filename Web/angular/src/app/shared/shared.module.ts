import { NgModule } from '@angular/core';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedAutoScrollComponent } from './components';

@NgModule({
    imports: [
        InfiniteScrollModule
    ],
    declarations: [
        SharedAutoScrollComponent
    ],
    exports: [
        SharedAutoScrollComponent
    ]
})
export class SharedModules { }