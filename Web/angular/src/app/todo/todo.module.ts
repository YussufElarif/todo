import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';

import { todoReducers } from './state/todo.reducers';

import { TodoComponent } from './todo.component';
import { TodoEffects } from './state/todo.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('todoFeature', todoReducers),
        EffectsModule.forFeature([TodoEffects]),
        // MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule
    ],
    declarations: [
        TodoComponent
    ]
})
export class TodoModule { }