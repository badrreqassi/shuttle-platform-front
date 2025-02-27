import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionUserListComponent } from './subscription-user-list.component';

describe('SubscriptionListComponent', () => {
  let component: SubscriptionUserListComponent;
  let fixture: ComponentFixture<SubscriptionUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
