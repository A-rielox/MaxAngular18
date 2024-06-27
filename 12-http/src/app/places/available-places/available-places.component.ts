import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { catchError, map, of, throwError } from 'rxjs';

@Component({
   selector: 'app-available-places',
   standalone: true,
   templateUrl: './available-places.component.html',
   styleUrl: './available-places.component.css',
   imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
   private httpClient = inject(HttpClient);
   private destroyRef = inject(DestroyRef);

   isFetching = signal(false);
   error = signal('');
   places = signal<Place[] | undefined>(undefined);

   ngOnInit(): void {
      this.isFetching.set(true);

      const subscription = this.httpClient
         .get<{ places: Place[] }>('http://localhost:3000/places', {
            observe: 'response', // p'q me muestre todo el response object, con headers y body
         })
         .pipe(
            map((resp) => {
               if (!resp.body) return undefined;

               return resp.body.places;
            }), // throwError de rxjs , devuelve un observable que tira un error automaticamente
            //     con lo que se va a agarrar en el subscribe( { ..., error: () => {} } )
            catchError((err) =>
               throwError(() => {
                  console.log(err);
                  new Error('hubo un error');
               }),
            ),
         )
         .subscribe({
            next: (places) => {
               console.log(places);

               this.places.set(places);
            },
            error: (err: Error) => this.error.set(err.message),
            complete: () => this.isFetching.set(false),
         });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
   }
}
