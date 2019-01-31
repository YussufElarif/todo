import { TestBed, async, TestModuleMetadata, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@todo/app-state.model';

import { Todo } from '../models';
import { UpdateTodo, DeleteTodo } from '../+state';
import { TodoDetailComponent } from './todo-detail.component';

describe('TodoDetailComponent', () =>
{
    let fixture: ComponentFixture<TodoDetailComponent>;
    let component: TodoDetailComponent;

    let store: Store<AppState>;

    beforeEach(async(() =>
    {
        const modules: TestModuleMetadata = {
            declarations: [
                TodoDetailComponent
            ],
            providers: [
                { provide: Store, useValue: { dispatch: () => { } } }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        };

        TestBed
            .configureTestingModule(modules)
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TodoDetailComponent);
        component = fixture.componentInstance;

        // @ts-ignore - Store != Store<AppState> && Store<AppState> cannot be passed through as argument without complaint
        store = fixture.debugElement.injector.get(Store);
    });

    it('should create the component', () =>
    {
        expect(component).toBeTruthy();
    });

    describe('changeMode', () =>
    {
        it('should invert the state of edit | []', () =>
        {
            expect(component.edit).toBeFalsy();

            component.changeMode();

            expect(component.edit).toBeTruthy();
        });
    });

    describe('changeCheck', () =>
    {
        it('should call *updateTodo* | [args: string, args: boolean]', () =>
        {
            const id = '1';
            const isComplete = true;

            let spy = spyOn(component, 'updateTodo');
            spy.and.callThrough();

            component.changeCheck(id, isComplete);

            expect(component.updateTodo).toHaveBeenCalledWith(id, { isComplete });
        });
    });

    describe('changeValue', () =>
    {
        it('should call *updateTodo* | [args: string, value: string]', () =>
        {
            const id = '1';
            const value = 'test value';

            let spy = spyOn(component, 'updateTodo');
            spy.and.callThrough();

            component.changeValue(id, value);

            expect(component.updateTodo).toHaveBeenCalledWith(id, { value });
        });

        it('should call *changeMode* | [args: string, value: string]', () =>
        {
            const id = '1';
            const value = 'test value';

            let spy = spyOn(component, 'changeMode');
            spy.and.callThrough();

            component.changeValue(id, value);

            expect(component.changeMode).toHaveBeenCalled();
        });
    });

    describe('cancelChange', () =>
    {
        it('should set input value to original state value | [args: HTMLInputElement]', () =>
        {
            const todo = {
                value: 'test original value'
            } as Todo;
            const input = {
                value: 'test value'
            } as HTMLInputElement;

            component.todo = todo;
            component.cancelChange(input);

            expect(input.value).toBe(todo.value);
        });

        it('should call *changeMode* | [args: HTMLInputElement]', () =>
        {
            const todo = {
                value: 'test original Value'
            } as Todo;
            const input = {
                
            } as HTMLInputElement;

            let spy = spyOn(component, 'changeMode');
            spy.and.callThrough();

            component.todo = todo;
            component.cancelChange(input);

            expect(component.changeMode).toHaveBeenCalled();
        });
    });

    describe('updateTodo', () =>
    {
        it('should call *dispatch* on store | [args: string, args: Partial<Todo>]', () =>
        {
            const id = '1';
            const todo: Partial<Todo> = {
                isComplete: true
            };

            let spy = spyOn(store, 'dispatch');
            spy.and.callThrough();

            component.updateTodo(id, todo);

            expect(store.dispatch).toHaveBeenCalledWith(new UpdateTodo.Pending({ id, todo }));
        });
    });

    describe('deleteTodo', () =>
    {
        it('should call *dispatch* on store | [args: string]', () =>
        {
            const id = '1';

            let spy = spyOn(store, 'dispatch');
            spy.and.callThrough();

            component.deleteTodo(id);

            expect(store.dispatch).toHaveBeenCalledWith(new DeleteTodo.Pending(id));
        });
    });
});