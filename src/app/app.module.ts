import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPlacePage } from "../pages/add-place/add-place";
import { PlacePage } from "../pages/place/place";
import { SetLocationPage } from "../pages/set-location/set-location";
import { WelcomePage } from "../pages/welcome/welcome";
import { AgmCoreModule } from "angular2-google-maps/core";
import { PlacesService } from "../services/places";
import { TwitterService } from 'ng2-twitter';
import {SocialSharing} from "@ionic-native/social-sharing";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
      WelcomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBy1xOdJUZRt5aqPjUJugh0eWETvHlgpXA'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
      WelcomePage
  ],
  providers: [
    SocialSharing,
    File,
    Camera,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlacesService,
      TwitterService
  ]
})
export class AppModule {
}
