import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface SearchDropdownDialogData {
    options: string[];
    selected: string;
}

export interface SearchDropdownResponse {
    addNew: boolean;
    value: string;
}

@Component({
    selector: 'app-search-dropdown-dialog',
    templateUrl: './search-dropdown-dialog.component.html',
    styleUrls: ['./search-dropdown-dialog.component.css']
})
export class SearchDropdownDialogComponent implements OnInit {

    filteredItems: string[];
    selectedMap: { [index: string]: boolean; } = {};
    searchString: string;

    constructor(
        public hostElement: ElementRef,
        public dialogRef: MatDialogRef<SearchDropdownDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SearchDropdownDialogData,
    ) { }

    ngOnInit() {
        const selected = this.data.selected;

        if (selected && selected.length > 0) {
            for (const item of selected) {
                this.selectedMap[item] = true;
            }
        }

        this.filteredItems = this.data.options;
    }
    addNewValue() {
        const result: SearchDropdownResponse = {
            value: this.searchString,
            addNew: true,
        };

        this.dialogRef.close(result);
    }
    selectItem(option: string) {
        const result: SearchDropdownResponse = {
            value: option,
            addNew: false,
        };

        this.dialogRef.close(result);
    }
    filterItems(event: Event) {
        const target = event.target as HTMLInputElement;
        const value = target.value.toLowerCase();

        this.searchString = value;

        this.filteredItems = this.data.options.filter((option: string) => {
            return option.toLowerCase().includes(value);
        });
    }
    onNoClick() {
        this.dialogRef.close(null);
    }
}
