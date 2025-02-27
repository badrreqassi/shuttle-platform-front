import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarFilterComponent } from './avatar-filter.component';

describe('AvatarFilterComponent', () => {
    let component: AvatarFilterComponent;
    let fixture: ComponentFixture<AvatarFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AvatarFilterComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AvatarFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
