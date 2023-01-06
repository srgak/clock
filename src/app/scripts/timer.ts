import { BehaviorSubject } from 'rxjs';

export class Timer {
  private count: number = 0;
  private intervalId: any;
  private isReverse: boolean = false;
  public second$: BehaviorSubject<number>;

  constructor() {
    this.second$ = new BehaviorSubject(this.count);
  }

  private tick(): void {
    this.count = this.count >= 59 ? 0 : this.count + 1;
    this.second$.next(this.count);
  }

  public start(initVal: number = 0): void {
    this.count = initVal;
    this.intervalId = setInterval(this.tick.bind(this), 1000);
  }
  public stop(): void {
    clearInterval(this.intervalId);
  }
}