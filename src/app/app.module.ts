// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Plugins
import { AceEditorComponent } from 'ng2-ace-editor';
import { MaterializeDirective } from "angular2-materialize";
import { MarkdownToHtmlPipe } from 'markdown-to-html-pipe';
import { DndModule, DragDropService } from 'ng2-dnd';

// Routes
import { ROUTING } from "./app.routing";

// Services
import { ApiService } from './api.service';

// Components
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FloatingNavComponent } from './homepage/floating-nav.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SlidesComponent } from './homepage/slides/slides.component';
import { SignUpComponent } from './profile/sign-up/sign-up.component';
import { LoginComponent } from './profile/login/login.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { SnippetEditorComponent } from './snippets/snippet-editor/snippet-editor.component';
import { SnippetViewerComponent } from './snippets/snippet-viewer/snippet-viewer.component';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		DndModule.forRoot(),
		ROUTING
	],
	declarations: [
		AppComponent,
		MaterializeDirective,
		AceEditorComponent,
		MarkdownToHtmlPipe,
		HomepageComponent,
		FloatingNavComponent,
		NavComponent,
		FooterComponent,
		SlidesComponent,
		SignUpComponent,
		LoginComponent,
		UserProfileComponent,
		SnippetEditorComponent,
		SnippetViewerComponent,
	],
	providers: [ApiService, DragDropService],
	bootstrap: [AppComponent]
})
export class AppModule { }
