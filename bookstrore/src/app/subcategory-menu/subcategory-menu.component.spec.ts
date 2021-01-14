import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryMenuComponent } from './subcategory-menu.component';

describe('SubcategoryMenuComponent', () => {
  let component: SubcategoryMenuComponent;
  let fixture: ComponentFixture<SubcategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
