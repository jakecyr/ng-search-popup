import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchDropdownDialogComponent } from './search-dropdown-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        SearchDropdownDialogComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatInputModule,
    ],
    entryComponents: [
        SearchDropdownDialogComponent,
    ],
    exports: [
        SearchDropdownDialogComponent,
    ]
})
export class SearchDropdownDialogModule { }
