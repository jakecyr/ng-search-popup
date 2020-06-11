import { moduleMetadata } from '@storybook/angular';
import { SearchDropdownComponent } from './search-dropdown.component';
import { SearchDropdownModule } from './search-dropdown.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
    title: 'Search Dropdown',
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                BrowserAnimationsModule,
                SearchDropdownModule,
            ],
        }),
    ],
};

export const defaultStory = () => ({
    component: SearchDropdownComponent,
    props: {
        title: 'Search Dropdown Title',
        options: ['Option 1', 'Option 2'],
        selected: 'Option 1',
        containerClass: '',
    },
});
