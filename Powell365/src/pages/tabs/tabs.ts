import { Component } from '@angular/core';

import { NotificationsPage } from '../notifications/notifications';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NotificationsPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
