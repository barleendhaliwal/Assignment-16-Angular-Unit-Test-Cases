import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpRequestInterceptorMockService } from 'src/app/http-request-interceptor-mock.service';

import { CustomerRowComponent } from './customer-row.component';
import {mockUser, mockCustomer} from '../../http-request.service.spec'
describe('CustomerRowComponent', () => {
  let component: CustomerRowComponent;
  let fixture: ComponentFixture<CustomerRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRowComponent ],
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
    fixture = TestBed.createComponent(CustomerRowComponent);
    component = fixture.componentInstance;
    component.customer=mockCustomer[0];
    component.customerNumber=1;
    fixture.detectChanges();
  });

  it('should toggle pannel',()=>{
    expect(component.panelOpenState).toBeFalse()
    component.togglePanel();
    expect(component.panelOpenState).toBeTrue()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make api request and assign to users correctly ',()=>{
    expect(component.users).toEqual(mockUser)
  })
  it('should set editable to true on calling editCustomer method',()=>{
    component.editCustomer()
    expect(component.editable).toBeTrue();
  })
  it('should set editable to false on calling cancelCustomer method',()=>{
    component.cancelCustomer()
    expect(component.editable).toBeFalse();
  })
  it('should emit refresh event on successful deletion on calling deleteCustomer method',()=>{
    component.refreshEvent.subscribe(result=>{
      expect(result).toBeUndefined()
    })
    component.deleteCustomer();
  })
  it('should make editable false and emit refresh event on successful updation on calling saveCustomer method',()=>{
    component.refreshEvent.subscribe(result=>{
      expect(result).toBeUndefined()
    })
    component.saveCustomer();
    expect(component.editable).toBeFalse()
  })

});
