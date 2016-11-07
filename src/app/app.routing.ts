import {Routes, RouterModule} from "@angular/router";

import {HomepageComponent} from "./homepage/homepage.component";
import {LoginComponent} from "./profile/login/login.component";
import {SignUpComponent} from "./profile/sign-up/sign-up.component";

const APP_ROUTES: Routes = [
	// {path: '', redirectTo: '/', pathMatch: 'full'},
	{path: '', component: HomepageComponent},
	{path: 'login', component: LoginComponent},
	{path: 'sign-up', component: SignUpComponent}
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
