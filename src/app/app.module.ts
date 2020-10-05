import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { UserChatComponent } from './chat-room/user-chat/user-chat.component';
import { TherapistChatComponent } from './chat-room/therapist-chat/therapist-chat.component';
import { UserSelectionListComponent } from './chat-room/user-selection-list/user-selection-list.component';
import { TypingIndicatorComponent } from './chat-room/components/typing-indicator/typing-indicator.component';
import { ChatHeaderComponent } from './chat-room/components/chat-header/chat-header.component';
import { ChatMessageComponent } from './chat-room/components/chat-message/chat-message.component';
import { ChatControlsComponent } from './chat-room/components/chat-controls/chat-controls.component';

// Material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

// Other
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateUserDialogComponent } from './chat-room/components/create-user-dialog/create-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TypingIndicatorComponent,
    ChatHeaderComponent,
    ChatMessageComponent,
    ChatControlsComponent,
    ChatRoomComponent,
    UserChatComponent,
    TherapistChatComponent,
    UserSelectionListComponent,
    CreateUserDialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatProgressBarModule,
    MatListModule,
    MatBadgeModule,
    MatToolbarModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateUserDialogComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
