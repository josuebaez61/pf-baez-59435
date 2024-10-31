import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { restar, sumar } from '../../../store/actions/counter.actions';
import { selectCounterValue } from '../../../store/selectors/counter.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  value$: Observable<number>;

  constructor(private store: Store) {
    this.value$ = this.store.select(selectCounterValue);
  }

  onSumar(): void {
    this.store.dispatch(sumar());
  }

  onRestar(): void {
    this.store.dispatch(restar());
  }
}
