import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TitlebarComponent } from './titlebar.component';

describe('TitlebarComponent', () => {
  let component: TitlebarComponent;
  let fixture: ComponentFixture<TitlebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TitlebarComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
