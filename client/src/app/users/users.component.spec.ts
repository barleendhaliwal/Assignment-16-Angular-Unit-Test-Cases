import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpRequestInterceptorMockService } from '../http-request-interceptor-mock.service';
import { mockUser } from '../http-request.service.spec';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
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
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should assign users by making api call',async()=>{
    expect(component.users).toEqual(mockUser)
  })
});
