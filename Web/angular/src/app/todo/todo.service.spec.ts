import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { of, Observable } from 'rxjs';

import { HttpClientMock } from '@todo/core/+testing';
import { Pagination } from '@todo/shared/models';

import { Todo, TodoQueryParams } from './models';
import { TodoService } from './todo.service';

describe('TodoService', () =>
{
    let service: TodoService;
    let http: HttpClient;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                TodoService,
                { provide: HttpClient, useClass: HttpClientMock }
            ]
        });

        http = TestBed.get(HttpClient);
        service = TestBed.get(TodoService);
    });

    it('should create the service', () =>
    {
        expect(service).toBeTruthy();
    })

    describe('getTodos', () =>
    {
        it('should call *get* on http | [args: TodoQueryParams]', () =>
        {
            const queryParams: TodoQueryParams = {
                limit: 25,
                offset: 0
            };

            let spy = spyOn(http, 'get');
            spy.and.callThrough();

            service.getTodos(queryParams);

            expect(http.get).toHaveBeenCalledWith(service.base, { params: queryParams });
        });

        it('should return correct results | [args:  TodoQueryParams]', () =>
        {
            const queryParams: TodoQueryParams = {
                limit: 1,
                offset: 149
            };

            const expected: Observable<Pagination<Todo>> = of({
                items: [{
                    id: 1,
                    value: 'test todo',
                    isComplete: false
                }],
                total: 150
            });

            let spy = spyOn(http, 'get');
            spy.and.returnValue(expected);

            const actual = service.getTodos(queryParams);

            expect(actual).toBe(expected);
        });
    });

    describe('addTodo', () =>
    {
        it('should call *post* on http | [args: Pick<Todo, \'value\'>]', () =>
        {
            const todo: Pick<Todo, 'value'> = {
                value: 'todo value test'
            };

            let spy = spyOn(http, 'post');
            spy.and.callThrough();

            service.addTodo(todo);

            expect(http.post).toHaveBeenCalledWith(service.base, todo);
        });

        it('should return correct result | [args: Pick<Todo, \'value\'>]', () =>
        {
            const todo: Pick<Todo, 'value'> = {
                value: 'todo value test'
            };

            const expected: Observable<Todo> = of({
                id: 1,
                value: todo.value,
                isComplete: false
            });

            let spy = spyOn(http, 'post');
            spy.and.returnValue(expected);

            const actual = service.addTodo(todo);

            expect(actual).toBe(expected);
        })
    });

    describe('updateTodo', () =>
    {
        it('should call *put* on http | [args: string, args: Partial<Todo>', () =>
        {
            const id = '1';

            const todo: Partial<Todo> = {
                isComplete: true
            };

            let spy = spyOn(http, 'put');
            spy.and.callThrough();

            service.updateTodo(id, todo);

            expect(http.put).toHaveBeenCalledWith(`${service.base}/${id}`, todo);
        });

        it('should return correct result | [args: string, args: Partial<Todo>', () =>
        {
            const id = '1';

            const todo: Partial<Todo> = {
                value: 'todo value test change'
            };

            const expected: Observable<void> = of(undefined);

            let spy = spyOn(http, 'put');
            spy.and.returnValue(expected);

            const actual = service.updateTodo(id, todo);

            expect(actual).toBe(expected);
        });
    });

    describe('deleteTodo', () =>
    {
        it('should call *delete* on http | [args: string]', () =>
        {
            const id = '1';

            let spy = spyOn(http, 'delete');
            spy.and.callThrough();

            service.deleteTodo(id);

            expect(http.delete).toHaveBeenCalledWith(`${service.base}/${id}`);
        });

        it('should return correct result | [args: string]', () =>
        {
            const id = '1';

            const expected: Observable<void> = of(undefined);

            let spy = spyOn(http, 'delete');
            spy.and.returnValue(expected);

            const actual = service.deleteTodo(id);

            expect(actual).toBe(expected);
        });
    });
});