import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GameControllerComponent } from './game-controller/game-controller.component';
import { MatButtonModule, MatGridListModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    GameControllerComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
