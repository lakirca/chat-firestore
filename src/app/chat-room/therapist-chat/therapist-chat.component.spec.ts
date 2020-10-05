import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistChatComponent } from './therapist-chat.component';

describe('TherapistChatComponent', () => {
  let component: TherapistChatComponent;
  let fixture: ComponentFixture<TherapistChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
