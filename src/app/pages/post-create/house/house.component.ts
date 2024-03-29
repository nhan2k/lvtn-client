import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ISelect } from '@core/interfaces/category';
import { categories } from '@core/values/categories';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '@core/services/post.service';
import { ToastrService } from 'ngx-toastr';
import { NotifyService } from '@core/services/notify.service';
import { LoadingService } from '@core/services/loading.service';
import {
  balconnyDirections,
  interiorConditions,
  juridicals,
} from '@core/values/apartment';
import {
  typeHouses,
  numOfBedrooms,
  numOfBathrooms,
  numOfFloors,
} from '@core/values/house';
import { message } from '@core/values/error.message';
import { ExternalApiService } from '@core/services/external-api.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
})
export class PostCreateHouseComponent {
  categories: ISelect[] = [];
  brands: ISelect[] = [];
  typeGrounds: ISelect[] = [];
  groundDirections: ISelect[] = [];
  juridicals: ISelect[] = [];
  typeHouses: ISelect[] = [];
  numOfBedrooms: ISelect[] = [];
  numOfBathrooms: ISelect[] = [];
  balconnyDirections: ISelect[] = [];
  interiorConditions: ISelect[] = [];
  numOfFloors: ISelect[] = [];

  images: any[] = [];

  selectedCategory: string = 'Nhà ở';
  errorMessage: string | null = null;

  myForm: FormGroup;

  formData: FormData = new FormData();
  taxableValue: string = '';
  provinces: ISelect[] = [];
  province: string | null = null;
  districts: ISelect[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly toastrService: ToastrService,
    private readonly notifyService: NotifyService,
    private readonly loadingService: LoadingService,
    private readonly externalApiService: ExternalApiService
  ) {
    this.myForm = this.formBuilder.group({
      categoryName: ['Nhà ở'],
      type: ['Cần bán', [Validators.required, Validators.max(250)]],
      addressInForm: [null, [Validators.required, Validators.max(250)]],
      codeHouse: [null, [Validators.required, Validators.max(250)]],
      block: [null, [Validators.required, Validators.max(250)]],
      typeHouse: ['Nhà mặt phố, mặt tiền'],
      numberOfBedroom: ['1'],
      numberOfBathroom: ['1'],
      numberOfFloor: ['1'],
      doorDirection: ['Đông'],
      juridical: ['Đã có sổ'],
      interiorCondition: ['Nội thất cao cấp'],
      height: [0, Validators.min(0)],
      width: [0, Validators.min(0)],
      totalPrice: [0, Validators.min(0)],
      title: [null, [Validators.required, Validators.max(250)]],
      content: [null, [Validators.required, Validators.max(250)]],
      province: [null],
      district: [null, [Validators.required, Validators.max(250)]],
    });
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.categories = categories.filter(
      (category) => category.label !== this.selectedCategory
    );
    this.typeHouses = typeHouses;
    this.numOfBedrooms = numOfBedrooms;
    this.numOfBathrooms = numOfBathrooms;
    this.numOfFloors = numOfFloors;
    this.balconnyDirections = balconnyDirections;
    this.juridicals = juridicals;
    this.interiorConditions = interiorConditions;
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
    this.province = this.provinces.filter(
      (element) => element.value === ($event.target as any).value
    )[0].label;
    this.externalApiService
      .getDistricts(($event.target as any).value)
      .subscribe({
        next: (response) => {
          this.districts = response;
          this.loadingService.setLoading(false);
        },
        error: (error) => {
          this.loadingService.setLoading(false);
        },
      });
  }

  formatCurrency_TaxableValue(event: any) {
    var uy = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    }).format(event.target.value);
    this.taxableValue = uy;
  }

  onChange(target: any) {
    this.selectedCategory = target.value;
    this.router.navigate([`/${target.value}`]);
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        };

        reader.readAsDataURL(event.target.files[i]);

        this.formData.append(
          'files[]',
          event.target.files[i],
          event.target.files[i].name
        );
      }
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (!this.formData.get('files[]')) {
      this.errorMessage = 'Form không hợp lệ vui lòng kiểm tra lại';
    } else {
      if (this.myForm.valid) {
        this.loadingService.setLoading(true);
        for (const key in this.myForm.value) {
          if (Object.prototype.hasOwnProperty.call(this.myForm.value, key)) {
            const element = this.myForm.value[key];
            this.formData.append(key, element);
          }
        }
        this.formData.append(
          'address',
          JSON.stringify({
            province: this.province,
            district: this.myForm.value.district,
            address: this.myForm.value.addressInForm,
          })
        );
        this.postService.createPost(this.formData).subscribe({
          next: (response: any) => {
            this.toastrService.success('Tạo bài đăng thành công');
            this.notifyService.sendNotify(
              `Một bài đăng ${this.selectedCategory} được tạo ${JSON.stringify(
                response
              )}`
            );
            this.router.navigate(['/post-manage'], {
              queryParams: { status: 'hide' },
            });
            this.myForm.reset();
            this.loadingService.setLoading(false);
          },
          error: (error) => {
            this.toastrService.error(error || message);
            this.loadingService.setLoading(false);
          },
        });
      } else {
        this.errorMessage = 'Form không hợp lệ vui lòng kiểm tra lại';
      }
    }
  }
  public Editor = ClassicEditor;
}
