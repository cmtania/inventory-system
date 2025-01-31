import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { SpinnerState } from '../../state-management/states/spinner.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: false,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  @Select(SpinnerState.isLoading) isLoading$!: Observable<boolean>;
}
