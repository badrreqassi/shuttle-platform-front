import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOfferComponent } from './item-offer.component';

describe('ItemOfferComponent', () => {
  let component: ItemOfferComponent;
  let fixture: ComponentFixture<ItemOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
