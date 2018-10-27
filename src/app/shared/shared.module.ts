import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { tokenGetter } from './services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.host]
      }
    }),
    HttpClientModule
  ],

  exports: [CommonModule, RouterModule, FormsModule],
  entryComponents: []
})
export class SharedModule {}
