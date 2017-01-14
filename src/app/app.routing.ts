import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { SupportedLanguagesComponent } from './homepage/supported-languages/supported-languages.component';
import { LoginComponent } from './profile/login/login.component';
import { SignUpComponent } from './profile/sign-up/sign-up.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { PublicProfileComponent } from './profile/public-profile/public-profile.component';
import { SnippetEditorComponent } from './snippets/snippet-editor/snippet-editor.component';
import { SnippetViewerComponent } from './snippets/snippet-viewer/snippet-viewer.component';
import { PublicSnippetsComponent } from './snippets/public-snippets/public-snippets.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'languages', component: SupportedLanguagesComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'user/:email', component: PublicProfileComponent },
    { path: 'snippet/editor', component: SnippetEditorComponent },
    { path: 'snippets', component: PublicSnippetsComponent },
    { path: 'snippet/:id', component: SnippetViewerComponent }
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
