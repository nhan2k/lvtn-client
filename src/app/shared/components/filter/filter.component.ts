import { LoadingService } from './../../../core/services/loading.service';
import { ExternalApiService } from './../../../core/services/external-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { ISelect } from '@core/interfaces/category';
import { Router } from '@angular/router';
import { prices } from '@core/values/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() currentParams?: any;
  @Input() currentLink?: any;

  provinces: ISelect[] = [];
  codeProvince: number = 0;
  districts: ISelect[] = [];
  codeDistrict: number | null = null;
  province: string | null = null;
  prices: Array<any> = prices;

  constructor(
    private readonly externalApiService: ExternalApiService,
    private readonly loadingService: LoadingService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.externalApiService.getProvinces().subscribe({
      next: (response) => {
        this.provinces = response;
        this.loadingService.setLoading(false);
      },
      error: () => {
        this.loadingService.setLoading(false);
      },
    });
  }

  onProvincesChange($event: Event) {
    this.loadingService.setLoading(true);
    this.codeProvince = ($event.target as any).value;
    this.province = this.provinces.filter(
      (element) => element.value === ($event.target as any).value
    )[0].label;
    const { districts, ...rest } = this.currentParams;
    this.router
      .navigate([`${this.currentLink}`], {
        queryParams: {
          ...rest,
          province: this.province,
        },
      })
      .then(() => {
        this.externalApiService.getDistricts(this.codeProvince).subscribe({
          next: (response) => {
            this.districts = response;
            this.loadingService.setLoading(false);
          },
          error: (error) => {
            this.loadingService.setLoading(false);
          },
        });
      })
      .catch(() => this.loadingService.setLoading(false));
  }

  onDistrictsChange($event: Event) {
    this.loadingService.setLoading(true);

    this.router
      .navigate([`${this.currentLink}`], {
        queryParams: {
          ...this.currentParams,
          province: this.province,
          district: ($event.target as any).value,
        },
      })
      .then(() => {
        this.loadingService.setLoading(false);
      })
      .catch(() => this.loadingService.setLoading(false));
  }

  onChangePrice(target: any) {
    const priceValue = target.value;

    this.router
      .navigate([`${this.currentLink}`], {
        queryParams: {
          ...this.currentParams,
          price: priceValue,
        },
      })
      .then(() => {
        this.loadingService.setLoading(false);
      })
      .catch(() => this.loadingService.setLoading(false));
  }
}
