import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrainingPlaceholderComponent } from './training-placeholder.component';

describe('TrainingPlaceholderComponent', () => {
  let component: TrainingPlaceholderComponent;
  let fixture: ComponentFixture<TrainingPlaceholderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingPlaceholderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
