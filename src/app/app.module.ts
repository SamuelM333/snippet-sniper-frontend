import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HomepageComponent} from './homepage/homepage.component';
import {FloatingNavComponent} from './homepage/floating-nav.component';
import {SlidesComponent} from './homepage/slides/slides.component';

@NgModule({
	declarations: [
		AppComponent,
		HomepageComponent,
		FloatingNavComponent,
		SlidesComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
