import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireDatabaseModule,
  provideFirebaseApp(() => initializeApp({"projectId":"iwproyectofinal-267fa","appId":"1:1070100391769:web:e7d017dd4385bc1e8a8e48","storageBucket":"iwproyectofinal-267fa.appspot.com","apiKey":"AIzaSyAPJyKMidSs5vTJrcvCxa3WlEec5AToVXg","authDomain":"iwproyectofinal-267fa.firebaseapp.com","messagingSenderId":"1070100391769"})),
  provideAuth(() => getAuth())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
