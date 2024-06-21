import { FormGroup } from '@angular/forms';

export class FormUtils {
    static isInvalid(form: FormGroup, controlName: string): boolean {
        const control = form.get(controlName);
        return control ? control.invalid && control.touched : false;
    }
}