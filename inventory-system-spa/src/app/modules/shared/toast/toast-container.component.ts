import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
	selector: 'app-toasts',
	standalone: false,
	templateUrl: './toast-container.component.html',
	host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastsContainerComponent {
	toastService = inject(ToastService);
}