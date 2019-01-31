import { TestBed, async, TestModuleMetadata, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';


import { TodoFilterComponent } from './todo-filter.component';

describe('TodoFilterComponent', () =>
{
    let fixture: ComponentFixture<TodoFilterComponent>;
    let component: TodoFilterComponent;

    let router: Router;

    beforeEach(async(() =>
    {
        const modules: TestModuleMetadata = {
            declarations: [
                TodoFilterComponent
            ],
            providers: [
                { provide: Router, useValue: { navigate: () => { } } }
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
                CUSTOM_ELEMENTS_SCHEMA
            ]
        };

        TestBed
            .configureTestingModule(modules)
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TodoFilterComponent);
        component = fixture.componentInstance;

        router = fixture.debugElement.injector.get(Router);
    });

    it('should create the component', () =>
    {
        expect(component).toBeTruthy();
    });

    describe('search', () =>
    {
        it('should call *navigate* | [args: string]', () =>
        {
            const value = 'test search';

            let spy = spyOn(component, 'navigate');
            spy.and.callThrough();

            component.search(value);

            expect(component.navigate).toHaveBeenCalledWith({ search: value });
        });
    });

    describe('navigate', () =>
    {
        it('should call *navigate* on router | [args: any]', () =>
        {
            const filter = { search: 'test search' };

            let spy = spyOn(router, 'navigate');
            spy.and.callThrough();

            component.navigate(filter);

            expect(router.navigate).toHaveBeenCalledWith([], { queryParams: filter });
        });
    });
});