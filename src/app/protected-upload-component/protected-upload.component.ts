import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Account, Client, Storage } from 'appwrite';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-protected-upload-component',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './protected-upload.component.html',
  styleUrl: './protected-upload.component.scss'
})
export class ProtectedUploadComponent implements OnInit {
  client = new Client();
  storage: Storage;
  account: Account;
  authenticated = false;
  showLogin = false;
  email = '';
  password = '';
  uid = '';
  participationpw = '';
  selectedFiles: File[] = [];

  constructor() {
    this.client
      .setEndpoint('https://appwrite.kncklab.com/v1')
      .setProject('66a7c1020035534f958c');
    this.storage = new Storage(this.client);
    this.account = new Account(this.client);
  }

  ngOnInit() {
    this.checkSession();
  }

  checkSession() {
    this.account.get().then(
      (user) => {
        this.uid = user.$id;
        this.authenticated = true;
      },
      () => this.authenticated = false
    );
  }

  register() {
    if (this.participationpw !== "10yearsAVE") {
      alert('Nicht zur Teilnahme berechtigt.');
      return;
    }
    this.account.create('unique()', this.email, this.password).then(
      () => this.login(),
      error => alert('Registrierung fehlgeschlagen.')
    );
  }

  login() {
    this.account.createEmailPasswordSession(this.email, this.password).then(
      () => {
        this.authenticated = true;
        this.email = '';
        this.password = '';
      },
      error => alert('Login fehlgeschlagen.')
    );
  }

  logout() {
    this.account.deleteSession('current').then(
      () => {
        this.authenticated = false;
        this.showLogin = false;
      },
      error => console.error('Logout failed', error)
    );
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadFiles() {
    this.selectedFiles.forEach(file => {
      const id = this.uid + '____' + uuidv4().split('-')[0] + uuidv4().split('-')[1];
      this.storage.createFile('66a7c3710011f4767257', id, file).then(
        response => {
          alert('Datei erfolgreich hochgeladen.');
        },
        error => console.error('File upload failed', error)
      );
    });
    this.selectedFiles = [];
  }
}