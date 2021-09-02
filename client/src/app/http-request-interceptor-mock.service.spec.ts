import { TestBed } from '@angular/core/testing';

import { HttpRequestInterceptorMockService } from './http-request-interceptor-mock.service';

describe('HttpRequestInterceptorMockService', () => {
  let service: HttpRequestInterceptorMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestInterceptorMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
