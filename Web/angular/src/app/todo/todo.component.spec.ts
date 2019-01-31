import { TestBed, async, TestModuleMetadata, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';

import { PaginationQuery } from '@todo/shared/models';
import { AppState } from '@todo/app-state.model';

import { initialState, GetTodo, AddTodo } from './+state';
import { TodoState, TodoQueryParams } from './models';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () =>
{
    let fixture: ComponentFixture<TodoComponent>;
    let component: TodoComponent;
    
    let activatedRoute: ActivatedRoute;
    let store: Store<AppState>;

    beforeEach(async(() =>
    {
        const modules: TestModuleMetadata = {
            imports: [
                RouterTestingModule
            ],
            declarations: [
                TodoComponent
            ],
            providers: [
                { provide: Store, useValue: { select: () => of(), dispatch: () => { } } },
                { provide: ActivatedRoute, useValue: { queryParams: of(), snapshot: { queryParams: {} } } }
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
        fixture = TestBed.createComponent(TodoComponent);
        component = fixture.componentInstance;

        // @ts-ignore - Store != Store<AppState> && Store<AppState> cannot be passed through as argument without complaint
        store = fixture.debugElement.injector.get(Store);
        activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    });

    it('should create the component', () =>
    {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () =>
    {
        it('should select the todos state | []', () =>
        {
            const state: TodoState = { ...initialState };

            let spy = spyOn(store, 'select');
            spy.and.returnValue(of(state));

            component.ngOnInit();

            expect(component.state).toBe(state);
        });

        it('should call *getTodo* on queryParam subscription | []', () =>
        {
            const state: TodoState = { ...initialState };
            const params: Params = { search: 'test' };
            activatedRoute.queryParams = of(params);

            let stateSpy = spyOn(store, 'select');
            stateSpy.and.returnValue(of(state));

            let componentSpy = spyOn(component, 'getTodo');
            componentSpy.and.callThrough();

            component.ngOnInit();

            expect(component.getTodo).toHaveBeenCalledWith({ offset: 0, limit: state.limit, ...params });
        });
    });

    describe('paginate', () =>
    {
        it('should call *getTodo* | [args: PaginationQuery]', () =>
        {
            const filters: PaginationQuery = { limit: 15, offset: 0 };
            const params: Params = { search: 'test' };
            activatedRoute.snapshot.queryParams = params;

            let spy = spyOn(component, 'getTodo');
            spy.and.callThrough();

            component.paginate(filters);

            expect(component.getTodo).toHaveBeenCalledWith({ ...params, ...filters });
        });

        it('should call *getTodo* | []', () =>
        {
            const params = { search: 'test' };
            activatedRoute.snapshot.queryParams = params;

            let spy = spyOn(component, 'getTodo');
            spy.and.callThrough();

            component.paginate();

            expect(component.getTodo).toHaveBeenCalledWith(params);
        });
    });

    describe('getTodo', () =>
    {
        it('should call *dispatch* on store | [args: TodoQueryParams]', () =>
        {
            const filters: TodoQueryParams = {
                search: 'test search',
                offset: 50,
                limit: 25
            };

            let spy = spyOn(store, 'dispatch');
            spy.and.callThrough();

            component.getTodo(filters);

            expect(store.dispatch).toHaveBeenCalledWith(new GetTodo.Pending(filters));
        });
    });

    describe('addTodo', () =>
    {
        it('should call *dispatch* on store | [args: string]', () =>
        {
            const value = 'test todo';

            let spy = spyOn(store, 'dispatch');
            spy.and.callThrough();

            component.addTodo(value);

            expect(store.dispatch).toHaveBeenCalledWith(new AddTodo.Pending(value));
        });
    });
});
