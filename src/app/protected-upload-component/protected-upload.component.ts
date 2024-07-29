import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account, Client, Storage } from 'appwrite';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-protected-upload-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './protected-upload.component.html',
  styleUrl: './protected-upload.component.scss'
})
export class ProtectedUploadComponent implements OnInit {
  client = new Client();
  storage: Storage;
  account: Account;
  authenticated = false;
  password = '';
  selectedFiles: File[] = [];

  constructor() {
    this.client
      .setEndpoint('https://appwrite.kncklab.com/v1')
      .setProject('66a7c1020035534f958c');
    this.storage = new Storage(this.client);
    this.account = new Account(this.client);
  }

  ngOnInit() {
    // Check if user is already authenticated
    this.account.get().then(
      () => this.authenticated = true,
      () => this.authenticated = false
    );
  }

  authenticate() {
    if (this.password === '10yearsAVE') {
      this.account.createAnonymousSession().then(
        () => this.authenticated = true,
        error => console.error('Authentication failed', error)
      );
    } else {
      alert('Incorrect password');
    }
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadFiles() {
    this.selectedFiles.forEach(file => {
      const id = uuidv4()
      this.storage.createFile('66a7c3710011f4767257', id, file).then(
        response => console.log('File uploaded successfully', response),
        error => console.error('File upload failed', error)
      );
    });
  }
}