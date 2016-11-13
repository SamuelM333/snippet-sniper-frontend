import {Component} from '@angular/core';
import {Router} from '@angular/router'

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.sass']
})
export class FooterComponent {

	constructor(private router: Router) { }

	relativePos() {
		if (this.router.url === '/snippet/view')
			return true;
		else
			return false;
	}

}
