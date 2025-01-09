import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  country?: Country;
  translationKeys: string[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    this.activateRoute.params
      .subscribe( ({id}) => {
        this.countriesService.searchCountryByAlpha(id)
          .subscribe( country => {
            if ( !country ) return this.router.navigateByUrl('');
            this.country = country;
            this.translationKeys = Object.keys(country.translations);
            return;
          })
      })
  }




}
