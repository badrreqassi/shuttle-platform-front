import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterShuttlesComponent } from './filter-shuttles.component';

describe('FilterShuttlesComponent', () => {
    let component: FilterShuttlesComponent;
    let fixture: ComponentFixture<FilterShuttlesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilterShuttlesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FilterShuttlesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
