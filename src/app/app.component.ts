import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProtectedUploadComponent } from "./protected-upload-component/protected-upload.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProtectedUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rome';
}
