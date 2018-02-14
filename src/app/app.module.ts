import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GameControllerComponent } from './game-controller/game-controller.component';
import {MatButtonModule, MatCardModule, MatGridListModule, MatListModule} from '@angular/material';
import { StatisticsComponent } from './statistics/component/statistics.component';
import {ClockService} from './statistics/clock.service';
import { PrestigeComponent } from './prestige/prestige.component';
import { AchievementsComponent } from './achievements/achievements.component';


@NgModule({
  declarations: [
    AppComponent,
    GameControllerComponent,
    StatisticsComponent,
    PrestigeComponent,
    AchievementsComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatButtonModule,
    MatListModule,
    MatCardModule
  ],
  providers: [ClockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
