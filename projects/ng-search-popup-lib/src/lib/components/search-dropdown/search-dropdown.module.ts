import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchDropdownComponent } from './search-dropdown.component';
import { SearchDropdownDialogModule } from '../search-dropdown-dialog/search-dropdown-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        SearchDropdownComponent,
    ],
    imports: [
        CommonModule,
        SearchDropdownDialogModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [
        SearchDropdownComponent,
    ]
})
export class SearchDropdownModule { }
