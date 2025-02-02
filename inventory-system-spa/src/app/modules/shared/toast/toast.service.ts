import { Injectable, Injector, TemplateRef } from '@angular/core';

export interface Toast {
    template: TemplateRef<any>;
    classname?: string;
    delay?: number;
}

export const TOAST_TYPES = [
    { classname: 'bg-success text-light', delay: 5000, type: 'SUCCESS' },
    { classname: 'bg-danger text-light', delay: 5000, type: 'ERROR' },
    { classname: 'bg-warning text-light', delay: 5000, type: 'WARNING' },
    { classname: 'bg-info text-light', delay: 5000, type: 'INFO' },
];

export const toast_template = `<ng-template #toastTemplate> MESSAGE </ng-template>`;

@Injectable(
    { providedIn: 'root' }
)

export class ToastService {

    constructor() { }

    toasts: Toast[] = [];

    show(templateRef: any, type = '') {
        const toastType = this.getToastType(type);
        this.toasts.push({ template: templateRef, classname: toastType?.classname, delay: toastType?.delay });
    }

    remove(toast: Toast) {
        this.toasts = this.toasts.filter((t) => t !== toast);
    }

    clear() {
        this.toasts.splice(0, this.toasts.length);
    }

    private getToastType(type: string) {
        return TOAST_TYPES.find(t => t.type === type);
    }

}