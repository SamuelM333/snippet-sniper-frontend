import { Component, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Fragment } from "../snippet";

declare const ace: any;
declare const $: any;
declare const Materialize: any;

@Component({
	selector: 'app-snippet-editor',
	templateUrl: './snippet-editor.component.html',
	styleUrls: ['./snippet-editor.component.sass']
})
export class SnippetEditorComponent implements AfterViewInit {
	
	@ViewChild('editor') editor;
	modalActions = new EventEmitter<string|MaterializeAction>();
	
	title: string = '';
	text: string = `function foo(items) {
	var x = "All this is syntax highlighted";
  	return x;\n}`;
	
	fragments: Array<Fragment> = [];
	
	languages = [
		{ text: "Javascript", name: "javascript", icon: "assets/svg/js.svg" },
		{ text: "Python", name: "python", icon: "assets/svg/python.svg" },
		{ text: "C++", name: "c_cpp", icon: "assets/svg/c++.svg" }
	];
	
	selectedLanguage = this.languages[0].name;
	
	
	ngAfterViewInit() {
		ace.config.set('basePath', 'assets/ace');
		this.editor.setTheme("monokai");
		this.editor.setMode('javascript');
		this.editor.getEditor().setShowPrintMargin(false);
		this.editor.getEditor().setAutoScrollEditorIntoView(true);
		
		setTimeout(this.onResize, 100);
	}
	
	onResize() {
		let topHeight: number = $('#nav').outerHeight() + $('#snippet-container').outerHeight();
		let footerHeight: number = $('#footer').outerHeight();
		let windowHeight: number = $(window).outerHeight();
		
		$('#editor').height(windowHeight - topHeight - footerHeight - 1);
	}
	
	addFragment() {
		let editorText: string = this.editor.getEditor().getValue();
		let toastMessage: string = "Fragment added!"
		
		if (editorText !== "") {
			this.fragments.push(
				new Fragment(this.selectedLanguage, editorText)
			);
			this.editor.getEditor().setValue("");
		} else
			toastMessage = "Empty fragment!";
		
		Materialize.toast(toastMessage, 4000);
	}
	
	openFragment(index: number) {
		console.log(index);
		console.log(this.fragments[index]);
		
		this.selectedLanguage = this.languages[this.languages.findIndex(
			x => x.name === this.fragments[index].language)].name;
		
		this.changeEditorLanguage(this.selectedLanguage);
		
		this.editor.getEditor().setValue(this.fragments[index].code);
		this.closeModal();
	}
	
	submitSnippet() { console.log(this.fragments); }
	
	changeEditorLanguage(language) { this.editor.setMode(language); }
	
	openModal() { this.modalActions.emit({ action: "modal", params: ['open'] }); }
	
	closeModal() { this.modalActions.emit({ action: "modal", params: ['close'] }); }
}
