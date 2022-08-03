import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookListComponent } from './components/book-list/book-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import {MatPaginatorModule} from '@angular/material/paginator';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { TokenInterceptor } from './token.interceptor';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HighlightSearchPipe } from './shared/pipe/HighlightSearch.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    NavBarComponent,
    HomeComponent,
    MyAccountComponent,
    BookDetailComponent,
    ShoppingCartComponent,
    OrderSummaryComponent,
    HighlightSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
