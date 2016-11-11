import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ROUTING} from "./app.routing";
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HomepageComponent} from './homepage/homepage.component';
import {FloatingNavComponent} from './homepage/floating-nav.component';
import {SlidesComponent} from './homepage/slides/slides.component';
import {FormComponent} from './profile/form.component';
import {SignUpComponent} from './profile/sign-up/sign-up.component';
import {LoginComponent} from './profile/login/login.component';
import {NavComponent} from './shared/nav/nav.component';
import {FooterComponent} from './shared/footer/footer.component';
import {SnippetEditorComponent} from './snippets/snippet-editor/snippet-editor.component';
import {SnippetViewerComponent} from './snippets/snippet-viewer/snippet-viewer.component';

@NgModule({
	declarations: [
		AppComponent,
		HomepageComponent,
		FloatingNavComponent,
		SlidesComponent,
		FormComponent,
		SignUpComponent,
		LoginComponent,
		NavComponent,
		FooterComponent,
		SnippetEditorComponent,
		SnippetViewerComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		ROUTING
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
