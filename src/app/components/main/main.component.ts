import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClockCircle, ClockData } from 'src/app/models/interface';
import { makeArray } from 'src/app/scripts/array';
import { Timer } from 'src/app/scripts/timer';
import { ArrowComponent } from '../arrow/arrow.component';

@Component({
  selector: 'clock-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('clockCap') public clockCap!: ElementRef;
  @ViewChild('arrowSecond') public arrowSecond!: ArrowComponent;
  @ViewChild('gearHour') public gearHour!: ElementRef;
  @ViewChildren('chain') public chainList!: QueryList<ElementRef>;
  @HostListener('window:resize') private resizeClock(): void {
    const width = this.document.documentElement.clientWidth;
    const height = this.document.documentElement.clientHeight;
    if(width < height) {
      this.renderer2.setStyle(this.elRef.nativeElement, 'transform', `translate(-50%, -50%) scale(${width / (900 + 100)})`);
    } else {
      this.renderer2.setStyle(this.elRef.nativeElement, 'transform', `translate(-50%, -50%) scale(${height / (900 + 100)})`);
    }
  }

  public second$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public minute$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public hour$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private clockValuesHours: any = {
    val0: '12',
    val3: '3',
    val6: '6',
    val9: '9'
  };
  private clockValuesMinute: any = {
    val0: '60',
    val5: '05',
    val10: '10',
    val15: '15',
    val20: '20',
    val25: '25',
    val30: '30',
    val35: '35',
    val40: '40',
    val45: '45',
    val50: '50',
    val55: '55'
  };
  private readonly listHourCount: ClockCircle[] = makeArray(12, (_, i): ClockCircle => {
    return {
      angle: i * 30,
      value: this.clockValuesHours[`val${i}`],
      type: this.clockValuesHours[`val${i}`] ? 'number' : 'dash'
    }
  });
  private readonly listMinuteCount: ClockCircle[] = makeArray(60, (_, i): ClockCircle => {
    return {
      angle: i * 6,
      value: this.clockValuesMinute[`val${i}`],
      type: this.clockValuesMinute[`val${i}`] ? 'number' : 'dash'
    }
  });
  private readonly listSecondCount: ClockCircle[] = makeArray(60, (_, i): ClockCircle => {
    return {
      angle: i * 6,
      value: '',
      type: 'dash'
    }
  });
  public readonly dataClock: ClockData[] = [
    {
      items: this.listHourCount,
      type: 'hour'
    },
    {
      items: this.listMinuteCount,
      type: 'minute'
    },
    {
      items: this.listSecondCount,
      type: 'second'
    }
  ];
  public readonly listMinuteDetail: number[] = makeArray(60, (_, i) => (i + 1) * 6);
  public timer: Timer = new Timer();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly renderer2: Renderer2,
    private elRef: ElementRef
  ) { }

  private activateElements(timing: number = 1000, ...elements: Element[]): void {
    elements.forEach(el => {
      this.renderer2.addClass(el, 'active');
      setTimeout(() => {
        this.renderer2.removeClass(el, 'active');
      }, timing);
    });
  }

  public changeSecond(): void {
    this.second$.next(this.second$.value + 1);
    this.activateElements(
      600,
      this.arrowSecond.elRef.nativeElement
    );
  }

  public changeMinute(val: number = this.minute$.value): void {
    const activeChain = Array.from(this.chainList)[59 - val];
    this.minute$.next(val >= 59 ? 0 : val + 1);
    this.activateElements(
      1000,
      activeChain.nativeElement
    );
  }

  public changeHour(val: number = this.hour$.value): void {
    this.hour$.next(val + 1);
    this.activateElements(
      3000,
      this.gearHour.nativeElement
    );
  }

  private updateTime(): void {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    this.renderer2.setStyle(this.clockCap.nativeElement, 'transform', `rotateX(0deg)`);
    this.changeMinute(minutes - 1);
    this.changeHour((hours > 12 ? hours - 12 : hours) - 1);
    this.timer.stop();
    this.timer.start(seconds);
    setTimeout(() => {
      this.renderer2.addClass(this.clockCap.nativeElement, 'open');
    }, 3000);
  }

  ngOnInit(): void {
    this.resizeClock();
  }
  ngAfterViewInit(): void {
    this.updateTime();
  }
}
