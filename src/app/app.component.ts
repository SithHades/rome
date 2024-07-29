import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProtectedUploadComponent } from "./protected-upload-component/protected-upload.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ProtectedUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rome';
}
