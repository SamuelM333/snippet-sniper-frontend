import {Component, ViewChild, AfterViewInit, EventEmitter} from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';

declare var ace: any;
declare var $: any;

@Component({
	selector: 'app-snippet-editor',
	templateUrl: './snippet-editor.component.html',
	styleUrls: ['./snippet-editor.component.sass']
})

export class SnippetEditorComponent implements AfterViewInit {

	@ViewChild('editor') editor;
	modalActions = new EventEmitter<string|MaterializeAction>();

	title: string = '';
	// windowWidth = window.innerWidth;
	text: string = `function foo(items) {
	var x = "All this is syntax highlighted";
  	return x;\n}`;

	languages = [
		{text: "Javascript", name: "javascript", icon: "assets/svg/js.svg"},
		{text: "Python", name: "python", icon: "assets/svg/python.svg"},
		{text: "C++", name: "c_cpp", icon: "assets/svg/c++.svg"}
	];

	selectedValue = this.languages[0].name;


	ngAfterViewInit() {

		let topHeight: number = 0;
		let footerHeight: number = $('#footer').outerHeight();
		let documentHeight: number = $(document).outerHeight();

		ace.config.set('basePath', 'assets/ace');
		this.editor.setTheme("monokai");
		this.editor.setMode('javascript');
		this.editor.getEditor().setShowPrintMargin(false);
		this.editor.getEditor().setAutoScrollEditorIntoView(true);

		setTimeout(() => {
			topHeight = $('#nav').outerHeight() + $('#snippet-container').outerHeight();
			$('#editor').height(documentHeight - topHeight - footerHeight + 1);
		}, 1000);

	}

	getSnippetDetails() {
		console.log('title: ' + this.title);
		console.log('language: ' + this.selectedValue);
		console.log('code: \n' + this.editor.getEditor().getValue());
	}

	changeEditorLanguage(language) { this.editor.setMode(language); }

	openModal() { this.modalActions.emit({action: "modal", params: ['open']}); }

	closeModal() { this.modalActions.emit({action: "modal", params: ['close']}); }

}
