import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { ArrowModule } from '../arrow/arrow.module';
import { CircleModule } from 'src/app/components/circle/circle.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    ArrowModule,
    CircleModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
