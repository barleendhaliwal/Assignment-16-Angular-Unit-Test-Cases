import { HttpRequestService } from "./http-request.service";
import { environment } from '../environments/environment'


import {
  TestBed,
  fakeAsync,
} from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { User } from "./models/user.model";
import { Customer } from "./models/customer.model";

export const mockUser: User[] = [{
  id:1,
  firstName:'testFName',
  middleName:'testMName',
  lastName:'testLName',
  email:'test@test.com',
  phoneNumber:'0000000',
  roleId:0,
  address:'testAddress',
  customer:{
    name:'testCustomerName'}
}];
export const mockCustomer: Customer[] = [{
  id:1,
  name:'testCustomerName',
  website:'testCustomerWebsite',
  address:'testCustomerAddress'
}];

describe("Http Request Service", () => {
  let httpRequestService: HttpRequestService;
  let httpTestingController: HttpTestingController;
  const userBaseUrl = environment.BASE_URL_USERS;
  const customerBaseUrl=environment.BASE_URL_CUSTOMERS;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[HttpRequestService]
    });
    httpRequestService = TestBed.inject(HttpRequestService);
    httpTestingController = TestBed.inject(HttpTestingController);
    
  });

  it("should read users correctly on calling the getUsers function", fakeAsync(() => {
   
    httpRequestService.getUsers().subscribe((users:User[]) => {
      
      expect(JSON.stringify(users)).toEqual(JSON.stringify(mockUser));

    });
    let req = httpTestingController.expectOne(userBaseUrl + '?filter=%7B%0A%20%0A%20%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22firstName%22%3A%20true%2C%0A%20%20%20%20%22middleName%22%3A%20true%2C%0A%20%20%20%20%22lastName%22%3A%20true%2C%0A%20%20%20%20%22email%22%3A%20true%2C%0A%20%20%20%20%22phoneNumber%22%3A%20true%2C%0A%20%20%20%20%22address%22%3A%20true%2C%0A%20%20%20%20%22customerId%22%3A%20true%2C%0A%20%20%20%20%22roleId%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22include%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22relation%22%3A%20%22customer%22%0A%20%20%20%20%20%20%0A%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%0A%20%20%20%20%7D%0A%20%20%0A%20%20%5D%0A%7D');
    expect(req.request.method).toEqual("GET");
    req.flush(mockUser)
  }));

  it("should delete user correctly on calling the deleteUser function", fakeAsync(() => {
   
    httpRequestService.deleteUser(1).subscribe(() => {});
    let req = httpTestingController.expectOne(userBaseUrl+`/1`)
    expect(req.request.method).toEqual("DELETE");
  }));

  it("should get customerId correctly from User on calling the getCustomerId function", fakeAsync(() => {
  
    httpRequestService.getCustomerId(mockUser[0]).subscribe((customer:any) => {
      
      expect(JSON.stringify(customer)).toEqual(JSON.stringify(mockCustomer))
    });
    let req = httpTestingController.expectOne(customerBaseUrl+`/?filter[where][name]=${mockUser[0].customer.name}`)
    expect(req.request.method).toEqual("GET");
    req.flush(mockCustomer)
  }));

  it("should edit user correctly on calling the editUser function", fakeAsync(() => {
  
    httpRequestService.editUser(1,mockUser[0]).subscribe((user:any) => {

      expect(JSON.stringify(user)).toEqual(JSON.stringify(mockUser[0]))
    });
    let req = httpTestingController.expectOne(userBaseUrl + `/1`)
    expect(req.request.method).toEqual("PATCH");
    req.flush(mockUser[0])
  }));

  it("should post user correctly on calling the postUser function", fakeAsync(() => {
  
    httpRequestService.postUser(mockUser[0]).subscribe((user:User) => {
      expect(JSON.stringify(user)).toEqual(JSON.stringify(mockUser[0]))
    });
    let req = httpTestingController.expectOne(userBaseUrl)
    expect(req.request.method).toEqual("POST");
    req.flush(mockUser[0])
  }));

  it("should read customers correctly on calling the getCustomers function", fakeAsync(() => {
   
    httpRequestService.getCustomers().subscribe((customers:Customer[]) => {
      
      expect(JSON.stringify(customers)).toEqual(JSON.stringify(mockCustomer));

    });
    let req = httpTestingController.expectOne(customerBaseUrl)
    expect(req.request.method).toEqual("GET");
    req.flush(mockCustomer)
  }));

  it('should get users from customers correctly on calling the getUsersFromCustomer method',fakeAsync(()=>{
    httpRequestService.getUsersFromCustomer(1).subscribe((users:User[])=>{
      expect(JSON.stringify(users)).toEqual(JSON.stringify(mockUser));
    })
    let req = httpTestingController.expectOne(`${customerBaseUrl}/1/users`)
    expect(req.request.method).toEqual("GET");
    req.flush(mockUser)
  }))

  it("should delete customer correctly on calling the deleteCustomer function", fakeAsync(() => {
   
    httpRequestService.deleteCustomer(1).subscribe(() => {});
    let req = httpTestingController.expectOne(customerBaseUrl+`/1`)
    expect(req.request.method).toEqual("DELETE");
  }));

  it("should edit customer correctly on calling the editCustomer function", fakeAsync(() => {
  
    httpRequestService.editCustomer(1,mockUser[0]).subscribe((customer:any) => {

      expect(JSON.stringify(customer)).toEqual(JSON.stringify(mockCustomer[0]))
    });
    let req = httpTestingController.expectOne(customerBaseUrl+ `/1`)
    expect(req.request.method).toEqual("PATCH");
    req.flush(mockCustomer[0])
  }));

  it("should post customer correctly on calling the postCustomer function", fakeAsync(() => {
  
    httpRequestService.postCustomer(mockCustomer[0]).subscribe((customer:Customer) => {
      expect(JSON.stringify(customer)).toEqual(JSON.stringify(mockCustomer[0]))
    });
    let req = httpTestingController.expectOne(customerBaseUrl)
    expect(req.request.method).toEqual("POST");
    req.flush(mockCustomer[0])
  }));

});
