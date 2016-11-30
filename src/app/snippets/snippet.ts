class Fragment {
	language: string;
	code: string;
}

export class Snippet {
	public id: string;
	public owner: any;
	public title: string;
	public created: string;
	public body: any[];

	constructor(_id: string, _owner: any, _title: string, _created: string, _body: any[]){
		this.id = _id;
		this.owner = _owner;
		this.title = _title;
		this.created = _created;
		this.body = _body;
	}
	
}

export function serializeSnippet(data): Snippet {
	
	return new Snippet(
		data._id,
		data.owner,
		data.title,
		data._created,
		data.fragments
	);
}
