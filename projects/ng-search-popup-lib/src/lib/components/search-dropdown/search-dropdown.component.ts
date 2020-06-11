import { Component, ViewChild, HostListener, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
    SearchDropdownDialogComponent,
    SearchDropdownDialogData
} from '../search-dropdown-dialog/search-dropdown-dialog.component';
import { MatButton } from '@angular/material/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-search-dropdown',
    templateUrl: './search-dropdown.component.html',
    styleUrls: ['./search-dropdown.component.css']
})
export class SearchDropdownComponent implements OnDestroy {

    @ViewChild('button') matButtonElementRef: MatButton;

    @Input() title: string;
    @Input() options: string[];
    @Input() selected: string;
    @Input() containerClass = 'input-container';
    @Output() selectionChange = new EventEmitter<string>();
    @Output() addNewValue = new EventEmitter<string>();

    ngDestroy$ = new Subject();
    dialogRef: MatDialogRef<SearchDropdownDialogComponent>;
    clickoutHandler: (event: MouseEvent) => void;

    @HostListener('document:click', ['$event'])
    clickout(event: MouseEvent) {
        if (this.clickoutHandler) {
            this.clickoutHandler(event);
        }
    }

    constructor(private matDialog: MatDialog) { }

    ngOnDestroy() {
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }
    getLabel() {
        if (this.selected && this.selected.trim()) {
            return this.selected;
        } else if (this.title) {
            return this.title;
        } else {
            return 'Select Option';
        }
    }
    openDropdownDialog() {
        // don't open if already open
        if (this.dialogRef) {
            return;
        }

        const inputElement = this.matButtonElementRef._elementRef.nativeElement;
        const inputX = inputElement.getBoundingClientRect().left;
        const inputY = inputElement.getBoundingClientRect().top;

        const dialogData: SearchDropdownDialogData = {
            selected: this.selected,
            options: this.options,
        };

        this.dialogRef = this.matDialog.open(SearchDropdownDialogComponent, {
            data: dialogData,
            height: '400px',
            width: '400px',
            hasBackdrop: false,
            disableClose: false,
            restoreFocus: false,
            position: {
                top: (inputY + 40) + 'px',
                left: inputX + 'px',
            }
        });

        this.dialogRef
            .afterOpened()
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(() => {
                this.clickoutHandler = this.closeDialogFromClickout;
            });

        this.dialogRef
            .afterClosed()
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((result: string) => {
                this.dialogRef = null;
                this.clickoutHandler = null;

                // only emit change on click save
                if (result) {
                    this.selectionChange.emit(result);
                } else {
                    this.selected = null;
                }
            });
    }
    closeDialogFromClickout(event: MouseEvent) {
        const matDialogContainerEl = this.dialogRef.componentInstance.hostElement.nativeElement.parentElement;
        const rect = matDialogContainerEl.getBoundingClientRect();

        if (event.clientX <= rect.left || event.clientX >= rect.right ||
            event.clientY <= rect.top || event.clientY >= rect.bottom) {
            this.dialogRef.close();
        }
    }
}
