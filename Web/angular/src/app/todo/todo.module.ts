import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SharedModules } from '@todo/shared';

import { TodoEffects } from './state/todo.effects';
import { todoReducers } from './state/todo.reducers';

import { TodoComponent } from './todo.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        StoreModule.forFeature('todoFeature', todoReducers),
        EffectsModule.forFeature([TodoEffects]),
        MatButtonModule,
        MatInputModule,
        MatIconModule,

        SharedModules
    ],
    declarations: [
        TodoComponent
    ]
})
export class TodoModule { }