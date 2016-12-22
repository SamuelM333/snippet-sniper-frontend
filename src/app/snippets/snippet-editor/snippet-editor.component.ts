import { Component, ViewChild, AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Fragment } from '../snippet';

declare const ace: any;
declare const $: any;
declare const Materialize: any;

@Component({
    selector: 'app-snippet-editor',
    templateUrl: './snippet-editor.component.html',
    styleUrls: ['./snippet-editor.component.sass']
})
export class SnippetEditorComponent implements AfterViewInit, OnDestroy {

    @ViewChild('editor') editor;
    @ViewChild('fragment_select') fragment_select;
    modalActions = new EventEmitter<string|MaterializeAction>();

    title: string = '';
    text: string = `function foo(items) {
    var x = 'All this is syntax highlighted';
    return x;\n}`;

    fragments: Array<Fragment> = [];

    languages = [
        { language: 'Javascript', editorLanguage: 'javascript', icon: 'assets/svg/js.svg' },
        { language: 'Python', editorLanguage: 'python', icon: 'assets/svg/python.svg' },
        { language: 'C++', editorLanguage: 'c_cpp', icon: 'assets/svg/c++.svg' }
    ];

    selectedLanguage = this.languages[0];

    constructor(private dragulaService: DragulaService) {
        dragulaService.setOptions('fragments-list', {
            moves: function (el, container, handle) {
                return handle.className === 'material-icons fragment-icons';
            }
        });
    }

    ngAfterViewInit() {
        ace.config.set('basePath', 'assets/ace');
        this.editor.setTheme('monokai');
        this.editor.setMode('javascript');
        this.editor.getEditor().setShowPrintMargin(false);
        this.editor.getEditor().setAutoScrollEditorIntoView(true);

        setTimeout(this.onResize, 100);
        $('.tooltipped').tooltip({ delay: 50 });
        console.log(this.fragment_select);
    }

    ngOnDestroy() { this.dragulaService.destroy('fragments-list'); }

    onResize() {
        let topHeight: number = $('#nav').outerHeight() + $('#snippet-container').outerHeight();
        let footerHeight: number = $('#footer').outerHeight();
        let windowHeight: number = $(window).outerHeight();

        $('#editor').height(windowHeight - topHeight - footerHeight - 1);
    }

    addFragment() {
        let editorText: string = this.editor.getEditor().getValue();
        let toastMessage: string = 'Fragment added!';

        if (editorText !== '') {
            this.fragments.push(
                new Fragment(this.selectedLanguage.language,
                    this.selectedLanguage.editorLanguage,
                    editorText)
            );
            this.editor.getEditor().setValue('');
        } else
            toastMessage = 'Empty fragment!';

        Materialize.toast(toastMessage, 4000);
    }

    openFragment(index: number) {
        this.selectedLanguage = this.languages[this.languages.findIndex(
            x => x.editorLanguage === this.fragments[index].editorLanguage)];

        this.changeEditorLanguage(this.selectedLanguage.editorLanguage);
        this.editor.getEditor().setValue(this.fragments[index].code);
        this.fragment_select.nativeElement.value = this.selectedLanguage.language;

        this.closeModal();
    }

    submitSnippet() { console.log(this.fragments); }

    changeEditorLanguage(language) {
        this.selectedLanguage = this.languages[this.languages.findIndex(
            x => x.editorLanguage === language)];
        this.editor.setMode(language);
    }

    openModal() { this.modalActions.emit({ action: 'modal', params: ['open'] }); }

    closeModal() { this.modalActions.emit({ action: 'modal', params: ['close'] }); }
}
