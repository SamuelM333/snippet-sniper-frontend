import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTING } from "./app.routing";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AceEditorComponent } from 'ng2-ace-editor';
import { MaterializeDirective } from "angular2-materialize";
import { HomepageComponent } from './homepage/homepage.component';
import { FloatingNavComponent } from './homepage/floating-nav.component';
import { SlidesComponent } from './homepage/slides/slides.component';
import { SignUpComponent } from './profile/sign-up/sign-up.component';
import { LoginComponent } from './profile/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SnippetEditorComponent } from './snippets/snippet-editor/snippet-editor.component';
import { SnippetViewerComponent } from './snippets/snippet-viewer/snippet-viewer.component';
import { EqualValidatorDirective } from './shared/equal-validator.directive'

@NgModule({
	declarations: [
		AppComponent,
		MaterializeDirective,
		AceEditorComponent,
		HomepageComponent,
		FloatingNavComponent,
		NavComponent,
		FooterComponent,
		SlidesComponent,
		SignUpComponent,
		LoginComponent,
		EqualValidatorDirective,
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
