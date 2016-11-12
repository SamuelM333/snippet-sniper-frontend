import {Component, ViewChild, AfterViewInit, Input } from '@angular/core';
declare var ace: any;

@Component({
	selector: 'app-snippet-editor',
	templateUrl: './snippet-editor.component.html',
	styleUrls: ['./snippet-editor.component.sass']
})

export class SnippetEditorComponent implements AfterViewInit {

	@ViewChild('editor') editor;
	@Input() text: string = `function foo(items) {
	var x = "All this is syntax highlighted";
  	return x;
}`;

	languages = [
		{id: 1, name: "Javascript", value: "javascript", icon: "assets/svg/js.svg"},
		{id: 2, name: "Python", value: "python", icon: "assets/svg/python.svg"},
		{id: 2, name: "C++", value: "c_cpp", icon: "assets/svg/c++.svg"}
	];
	selectedValue = this.languages[0];

	constructor() { }

	ngAfterViewInit() {
		// $('select').material_select();
		ace.config.set('basePath', 'assets/ace');
		this.editor.setTheme("monokai");

		// this.editor.getEditor().setOptions({
		// 	enableBasicAutocompletion: true
		// });

		this.editor.setMode('javascript');

		// this.editor.getEditor().commands.addCommand({
		// 	name: "showOtherCompletions",
		// 	bindKey: "Ctrl-.",
		// 	exec: function (editor) { }
		// });

	}

	getText(text: string){
		console.log(text);
	}

	changeEditorLanguage(language) {
		this.editor.setMode(language.value);
	}

}
