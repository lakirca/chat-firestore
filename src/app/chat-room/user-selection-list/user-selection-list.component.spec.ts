import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectionListComponent } from './user-selection-list.component';

describe('UserSelectionListComponent', () => {
  let component: UserSelectionListComponent;
  let fixture: ComponentFixture<UserSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSelectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
