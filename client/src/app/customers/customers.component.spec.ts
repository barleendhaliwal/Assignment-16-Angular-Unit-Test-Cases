import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersComponent } from './customers.component';
import {mockCustomer} from '../http-request.service.spec'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptorMockService } from '../http-request-interceptor-mock.service';
describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersComponent ],
      imports:[HttpClientTestingModule],
      providers:[
        {
          provide:HTTP_INTERCEPTORS,
          useClass:HttpRequestInterceptorMockService,
          multi:true
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign customers by making api call',async()=>{
    expect(component.customers).toEqual(mockCustomer)
  })
});
