import { MeetingAppPage } from './app.po';

describe('meeting-app App', function() {
  let page: MeetingAppPage;

  beforeEach(() => {
    page = new MeetingAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
