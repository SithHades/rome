import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account, Client, Storage } from 'appwrite';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  client = new Client();
  storage: Storage;
  account: Account;
  authenticated = false;
  password = '';
  files: any[] = [];

  constructor() {
    this.client
      .setEndpoint('https://appwrite.kncklab.com/v1')
      .setProject('66a7c1020035534f958c');
    this.storage = new Storage(this.client);
    this.account = new Account(this.client);
  }

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.account.get().then(
      (user) => {
        this.authenticated = user.name === 'Big Mike';
        this.listFiles();
      },
      () => this.authenticated = false
    );
  }

  authenticate() {
      this.account.createEmailPasswordSession('admin@rome.kncklab.com', this.password).then(
        (session) => {
          this.authenticated = true;
          this.listFiles();
        },
        error => console.error('Authentication failed', error)
      );
  }

  listFiles() {
    this.storage.listFiles('66a7c3710011f4767257').then(
      response => {
        this.files = response.files;
      },
      error => console.error('Failed to list files', error)
    );
  }

  downloadFile(fileId: string) {
    const response = this.storage.getFileDownload('66a7c3710011f4767257', fileId)
        // Create a download link and trigger the download
    const a = document.createElement('a');
    a.href = response.toString();
    a.download = this.files.find(file => file.$id === fileId).name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(response.toString());
  }
}