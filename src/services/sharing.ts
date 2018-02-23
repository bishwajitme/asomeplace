/*import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

export class HomePage {

    public sendTo: any;
    public subject: string = 'Message from Social Sharing App';
    public message: string = 'Take your app development skills to the next level with Mastering Ionic - the definitive guide';
    public image: string = 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
    public uri: string = 'http://masteringionic2.com/products/product-detail/s/mastering-ionic-2-e-book';


    shareViaTwitter() {
        this.platform.ready()
            .then(() => {

                SocialSharing.canShareVia('com.apple.social.twitter', this.message, this.image, this.uri)
                    .then((data) => {

                        SocialSharing.shareViaTwitter(this.message, this.image, this.uri)
                            .then((data) => {
                                console.log('Shared via Twitter');
                            })
                            .catch((err) => {
                                console.log('Was not shared via Twitter');
                            });

                    });

            })
            .catch((err) => {
                console.log('Not able to be shared via Twitter');
            });
    }

}
*/