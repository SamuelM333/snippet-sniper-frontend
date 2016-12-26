import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.sass']
})
export class FooterComponent {

    constructor(private router: Router) { }

    relativePos() {

        let links = [
            '/snippet/:id',
            '/snippets',
            '/sign-up'
        ];

        if (this.router.url === '/snippets' ||
            this.router.url === '/profile' ||
            this.router.url === '/sign-up') {
            return true;
        } else { return false; }
    }

}
