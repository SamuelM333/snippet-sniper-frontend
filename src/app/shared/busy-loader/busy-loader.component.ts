import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-busy-loader',
    templateUrl: './busy-loader.component.html',
})
export class BusyLoaderComponent {

    @Input()
    public isActive: boolean = false;

    @Input()
    public show: boolean = true;

    @Input()
    public big: boolean = false;

}
