import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ISelect } from '@core/interfaces/category';
import { ExternalApiService } from '@core/services/external-api.service';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent {
  @Input() provinceName?: string;
  @Input() districtName?: string;

  provinces: ISelect[] = [];
  codeProvince: number = 0;
  districts: ISelect[] = [];
  codeDistrict: number | null = null;

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

    this.externalApiService.getDistricts(this.codeProvince).subscribe({
      next: (response) => {
        this.districts = response;
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this.loadingService.setLoading(false);
      },
    });
  }

  onDistrictsChange($event: Event) {
    this.loadingService.setLoading(true);
    this.codeDistrict = ($event.target as any).value;
  }
}
