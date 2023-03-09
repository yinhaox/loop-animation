import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GsapDemoComponent} from './gsap-demo/gsap-demo.component';
import {CssDemoComponent} from './css-demo/css-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    GsapDemoComponent,
    CssDemoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
