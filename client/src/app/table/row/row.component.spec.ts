import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpRequestInterceptorMockService } from 'src/app/http-request-interceptor-mock.service';
import { mockUser } from 'src/app/http-request.service.spec';

import { RowComponent } from './row.component';

describe('RowComponent', () => {
    let component: RowComponent;
    let fixture: ComponentFixture<RowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RowComponent],
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpRequestInterceptorMockService,
                    multi: true
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RowComponent);
        component = fixture.componentInstance;
        component.user = mockUser[0];
        component.rowNumber=1;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should make editSelectedRole to users role Id and raise mode event', () => {
        component.mode.subscribe((result) => {
            expect(result.editable).toBeTrue();
        })
        component.editRow();
        expect(component.editSelectedRole).toEqual(component.user.roleId)
    })
    it('should emit mode event with editable property equal to false', () => {
        component.mode.subscribe((result) => {
            expect(result.editable).toBeFalse();
        })
        component.cancelRow()

    })
    it('it should emit mode event with editable property equal to false on save row',()=>{
     
        component.refreshEvent.subscribe((result)=>{
            expect(result).toBeUndefined()
        })
        component.mode.subscribe((result) => {
            expect(result.editable).toBeFalse();
        })
        component.saveRow();

    })
    it('should emit refresh event on successful updation on saving row by calling saveRow method',()=>{
        component.refreshEvent.subscribe((result)=>{
            expect(result).toBeUndefined()
        })
        component.saveRow();
    })

    it('should emit refresh event on successful deletion by calling deleteRow method',()=>{
        component.refreshEvent.subscribe((result)=>{
            expect(result).toBeUndefined()
        })
        component.deleteRow();
    })
    
});
