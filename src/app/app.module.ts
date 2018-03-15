import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GameControllerComponent } from './game-controller/game-controller.component';
import {MatButtonModule, MatCardModule, MatGridListModule, MatListModule, MatTabsModule} from '@angular/material';
import { StatisticsComponent } from './statistics/component/statistics.component';
import {ClockService} from './statistics/clock.service';
import { PrestigeComponent } from './prestige/prestige.component';
import { AchievementsComponent } from './achievements/achievements.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { BarComponent } from './bar/bar.component';


@NgModule({
  declarations: [
    AppComponent,
    GameControllerComponent,
    StatisticsComponent,
    PrestigeComponent,
    AchievementsComponent,
    BarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AngularSvgIconModule,
    MatGridListModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatCardModule
  ],
  providers: [ClockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
