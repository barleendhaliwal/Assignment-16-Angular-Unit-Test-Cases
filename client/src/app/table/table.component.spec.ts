import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { mockCustomer, mockUser } from '../http-request.service.spec'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptorMockService } from '../http-request-interceptor-mock.service';
describe('CustomersComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableComponent],
            imports: [HttpClientTestingModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign id of editable row to editableRowId by listening to event', async () => {
        component.changeDisplay({ disabled: true, id: 1 })
        expect(component.editableRowId).toEqual(-1)
        component.changeDisplay({ disabled: false, id: 1 })
        expect(component.editableRowId).toEqual(1)
    })
    it('should emit refresh event',()=>{
        component.refreshEvent.subscribe((result)=>{

            expect(result).toBeUndefined();
        })
        component.emitRefreshEventtoParent();
    })
    it('should change editable property on calling changeHeader method',()=>{
       expect(component.editable).toBeFalse();
       component.changeHeader({editable:true})
       expect(component.editable).toBeTrue();
    })

});
