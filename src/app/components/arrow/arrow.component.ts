import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { BehaviorSubject, pairwise, Subscription } from 'rxjs';

@Component({
  selector: 'clock-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.less']
})
export class ArrowComponent implements OnInit, OnDestroy {
  @Input() public data$: BehaviorSubject<number> = new BehaviorSubject(0);
  @Input() public degrees: number = 0;
  @Output() public onTick: EventEmitter<null> = new EventEmitter();
  @Output() public onTurn: EventEmitter<null> = new EventEmitter();

  private subs: Subscription = new Subscription();

  constructor(
    private readonly renderer2: Renderer2,
    public readonly elRef: ElementRef
  ) { }

  ngOnInit(): void {
    let additionalAngle = 0;

    this.subs.add(
      this.data$.pipe(
        pairwise()
      ).subscribe(val => {
        const [valPrev, valCurr] = val;

        additionalAngle = !valCurr && valPrev !== valCurr ? additionalAngle + 360 : additionalAngle;
        this.renderer2.setStyle(this.elRef.nativeElement, 'transform', `rotate(${valCurr * this.degrees + additionalAngle}deg)`);
        this.onTick.emit();
        if(valCurr % (360 / this.degrees) === 0) this.onTurn.emit();
      })
    );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
