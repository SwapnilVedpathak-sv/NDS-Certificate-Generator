import { Component } from '@angular/core';
import { RootService } from './root.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ndsapp';

  constructor(public root: RootService) {}

  ngOnInit() {}
}
