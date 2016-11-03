import { SnippetSniperFrontendPage } from './app.po';

describe('snippet-sniper-frontend App', function() {
  let page: SnippetSniperFrontendPage;

  beforeEach(() => {
    page = new SnippetSniperFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
