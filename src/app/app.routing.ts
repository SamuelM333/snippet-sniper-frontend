import {Routes, RouterModule} from "@angular/router";

import {HomepageComponent} from "./homepage/homepage.component";
import {LoginComponent} from "./profile/login/login.component";
import {SignUpComponent} from "./profile/sign-up/sign-up.component";
import {SnippetEditorComponent} from "./snippets/snippet-editor/snippet-editor.component";
import {SnippetViewerComponent} from "./snippets/snippet-viewer/snippet-viewer.component";

const APP_ROUTES: Routes = [
	// {path: '', redirectTo: '/', pathMatch: 'full'},
	{path: '', component: HomepageComponent},
	{path: 'login', component: LoginComponent},
	{path: 'sign-up', component: SignUpComponent},
	{path: 'snippet/editor', component: SnippetEditorComponent},
	{path: 'snippet/view', component: SnippetViewerComponent}
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
