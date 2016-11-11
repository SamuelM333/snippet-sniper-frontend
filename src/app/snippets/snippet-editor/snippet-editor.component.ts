import { Component, OnInit } from '@angular/core';
declare var ace: any;

@Component({
  selector: 'app-snippet-editor',
  templateUrl: './snippet-editor.component.html',
  styleUrls: ['./snippet-editor.component.sass']
})

export class SnippetEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
	  var editor = ace.edit("editor");
	  editor.setTheme("ace/theme/monokai");
	  editor.getSession().setMode("ace/mode/javascript");
  }

}
