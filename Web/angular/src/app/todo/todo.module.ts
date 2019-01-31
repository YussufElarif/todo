import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SharedModules } from '@todo/shared';

import { TodoEffects, todoReducers } from './+state';
import { TodoDetailComponent } from './todo-detail';
import { TodoFilterComponent } from './todo-filter';
import { TodoComponent } from './todo.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        StoreModule.forFeature('todos', todoReducers),
        EffectsModule.forFeature([TodoEffects]),
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,

        SharedModules
    ],
    declarations: [
        TodoComponent,
        TodoFilterComponent,
        TodoDetailComponent
    ]
})
export class TodoModule { }