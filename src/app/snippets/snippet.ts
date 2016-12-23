export class Fragment {
    language: string;
    editorLanguage: string;
    body: string;

    constructor(_language: string, _editorLanguage: string, _body: string) {
        this.language = _language;
        this.editorLanguage = _editorLanguage;
        this.body = _body;
    }
}

export class Snippet {
    public id: string;
    public idUser: number;
    public title: string;
    public created: string;
    public body: Fragment[];

    constructor(_id: string, _idUser: any, _title: string, _created: string, _body: Fragment[]) {
        this.id = _id;
        this.idUser = _idUser;
        this.title = _title;
        this.created = _created;
        this.body = _body;
    }

}

export function serializeSnippet(data): Snippet {
    return new Snippet(
        // data._id,
        data.idSnippet,
        data.idUser,
        data.title,
        // data._created,
        data.created,
        data.fragments
    );
}
