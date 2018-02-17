import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";

import { Place } from "../models/place";
import { Location } from "../models/location";
import { TwitterService } from 'ng2-twitter';
import { Base64 } from '@ionic-native/base64';
import {ToastController} from "ionic-angular";
declare var cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];
    result = '';

  constructor(private storage: Storage, private file: File, private twitter: TwitterService, private base64: Base64,
              private toastCtrl: ToastController
              ) {}

  addPlace(title: string,
           description: string,
           location: Location,
           imageUrl: string,
           dateTime:string = new Date().toISOString()) {
    const place = new Place(title, description, location, imageUrl, dateTime);
    this.places.push(place);
    this.postTweet(title, location, imageUrl);
    this.storage.set('places', this.places)
      .then()
      .catch(
        err => {
          this.places.splice(this.places.indexOf(place), 1);
        }
      );
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlaces() {
    return this.storage.get('places')
      .then(
        (places: Place[]) => {
          this.places = places != null ? places : [];
          return this.places;
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(
        () => {
          this.removeFile(place);
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  private removeFile(place: Place) {
    const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.file.dataDirectory, currentName)
      .then(
        () => console.log('Removed File')
      )
      .catch(
        () => {
          console.log('Error while removing File');
          //this.addPlace(place.title, place.description, place.location, place.imageUrl, place.dateTime);
        }
      );
  }

    postTweet(title, location, imageUrl) {

        this.base64.encodeFile(imageUrl).then((base64File: string) => {
           // console.log('base:'+base64File);
            //alert(base64File);
          return this.twitter.post(
                'https://upload.twitter.com/1.1/media/upload.json',
                {
                    media_data:base64File
                },
              {
                  consumerKey: 'RocnkbaFkVsfrbsczCkHwxD5F',
                  consumerSecret: 'lqaM5i7RfOc5XUhX0Sr9vx1WpDP8JkqHHjAVUXLCleSAy8dpgq'
              },
              {
                  token: '918029713645465601-FMIfV1Kdd2vQZZEPPe1SSLQpeLogVRo',
                  tokenSecret: 'ut7WrOiJ8gFOgr3YjTBnpfeO5ROQlo54JzDmntLUWMS41'
              }
          ) .subscribe((res)=>{
                  //this.result = res.json().map(tweet => tweet.text);
                  console.log(res.json());
                  console.log('media working');

              });
        }, (err) => {
            console.log(err);
        });

       // console.log(filePath);
        return this.twitter.post(
            'https://api.twitter.com/1.1/statuses/update.json',
            {
                status: title,
                lat: location.lat,
                long:location.lng,
            },
            {
                consumerKey: 'RocnkbaFkVsfrbsczCkHwxD5F',
                consumerSecret: 'lqaM5i7RfOc5XUhX0Sr9vx1WpDP8JkqHHjAVUXLCleSAy8dpgq'
            },
            {
                token: '918029713645465601-FMIfV1Kdd2vQZZEPPe1SSLQpeLogVRo',
                tokenSecret: 'ut7WrOiJ8gFOgr3YjTBnpfeO5ROQlo54JzDmntLUWMS41'
            }
        )
            .subscribe((res)=>{
                //this.result = res.json().map(tweet => tweet.text);
                console.log(res.json());
                //console.log('working');
                const toast = this.toastCtrl.create({
                    message: 'Tweet has been posted',
                    duration: 2500
                });
                toast.present();
            });
    }


}
