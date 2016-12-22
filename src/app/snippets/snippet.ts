export class Fragment {
    language: string;
    editorLanguage: string;
    code: string;

    constructor(_language: string, _editorLanguage: string, _code: string) {
        this.language = _language;
        this.editorLanguage = _editorLanguage;
        this.code = _code;
    }
}

export class Snippet {
    public id: string;
    public owner: any;
    public title: string;
    public created: string;
    public body: Fragment[];

    constructor(_id: string, _owner: any, _title: string, _created: string, _body: Fragment[]) {
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
