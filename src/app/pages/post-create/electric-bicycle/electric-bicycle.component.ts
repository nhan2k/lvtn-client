import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ISelect } from '@core/interfaces/category';
import { categories } from '@core/values/categories';
import { yearOfManufactures } from '@core/values/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '@core/services/post.service';
import { ToastrService } from 'ngx-toastr';
import { NotifyService } from '@core/services/notify.service';
import { LoadingService } from '@core/services/loading.service';
import { capacities, origins, typeMotorbikes } from '@core/values/motorbike';
import {
  brands,
  engines,
  typeElectricBicycles,
} from '@core/values/electric-bicycle';
import { guarantees } from '@core/values/phone';
import { message } from '@core/values/error.message';

@Component({
  selector: 'app-electric-bicycle',
  templateUrl: './electric-bicycle.component.html',
  styleUrls: ['./electric-bicycle.component.scss'],
})
export class PostCreateElectricBicycleComponent {
  categories: ISelect[] = [];
  brands: ISelect[] = [];
  typeMotorbikes: ISelect[] = [];
  origins: ISelect[] = [];
  typeElectricBicycles: ISelect[] = [];
  engines: ISelect[] = [];
  guarantees: ISelect[] = [];
  images: any[] = [];
  selectedCategory: string = 'Xe điện';
  errorMessage: string | null = null;
  myForm: FormGroup;
  formData: FormData = new FormData();
  taxableValue: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly toastrService: ToastrService,
    private readonly notifyService: NotifyService,
    private readonly loadingService: LoadingService
  ) {
    this.myForm = this.formBuilder.group({
      categoryName: ['Xe điện'],
      type: ['Cần bán'],
      brand: ['Vinfast'],
      typeElectricBicycle: ['Xe điện'],
      engine: ['< 200 W'],
      guarantee: ['1 tháng'],
      origin: ['Việt Nam'],
      capacity: ['Dưới 50 cc'],
      statusElectricBicycle: ['Mới'],
      totalPrice: [0, Validators.min(0)],
      title: [null, [Validators.required, Validators.max(250)]],
      content: [null, [Validators.required, Validators.max(250)]],
    });
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.categories = categories.filter(
      (category) => category.label !== this.selectedCategory
    );
    this.brands = brands;
    this.origins = origins;
    this.typeElectricBicycles = typeElectricBicycles;
    this.engines = engines;
    this.guarantees = guarantees;

    this.loadingService.setLoading(false);
  }

  formatCurrency_TaxableValue(event: any) {
    var uy = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    }).format(event?.target?.value);
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
    if (this.myForm.valid) {
      this.loadingService.setLoading(true);
      for (const key in this.myForm.value) {
        if (Object.prototype.hasOwnProperty.call(this.myForm.value, key)) {
          const element = this.myForm.value[key];
          this.formData.append(key, element);
        }
      }
      this.postService.createPost(this.formData).subscribe({
        next: (response: any) => {
          this.toastrService.success('Tạo bài đăng thành công');
          this.notifyService.sendNotify(
            `Một bài đăng ${this.selectedCategory} được tạo ${JSON.stringify(
              response
            )}`
          );
          this.myForm.reset();
          this.router.navigate(['/post-manage'], {
            queryParams: { status: 'hide' },
          });
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
  public Editor = ClassicEditor;
}
