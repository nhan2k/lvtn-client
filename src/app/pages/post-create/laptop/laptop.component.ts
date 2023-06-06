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
import { guarantees } from '@core/values/phone';
import {
  brands,
  hardwares,
  microProcessors,
  rams,
  typeHardwares,
} from '@core/values/laptop';
import { message } from '@core/values/error.message';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.scss'],
})
export class PostCreateLaptopComponent {
  categories: ISelect[] = [];
  brands: ISelect[] = [];
  guarantees: ISelect[] = [];
  hardwares: ISelect[] = [];
  typeHardwares: ISelect[] = [];
  rams: ISelect[] = [];
  microProcessors: ISelect[] = [];

  images: any[] = [];

  selectedCategory: string = 'Laptop';
  errorMessage: string | null = null;

  myForm: FormGroup;

  formData: FormData = new FormData();
  taxableValue: string = '';
  formatCurrency_TaxableValue(event: any) {
    var uy = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    }).format(event.target.value);
    this.taxableValue = uy;
  }

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly toastrService: ToastrService,
    private readonly notifyService: NotifyService,
    private readonly loadingService: LoadingService
  ) {
    this.myForm = this.formBuilder.group({
      categoryName: ['Laptop'],
      brand: ['Apple'],
      guarantee: ['1 tháng'],
      statusLaptop: ['Mới'],
      hardware: ['< 128 GB'],
      typeHardware: ['HDD'],
      ram: ['< 1 GB'],
      microProcessor: ['Intel Core 2 Duo'],

      totalPrice: [0, Validators.min(0)],
      title: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.categories = categories.filter(
      (category) => category.label !== this.selectedCategory
    );
    this.brands = brands;
    this.guarantees = guarantees;
    this.hardwares = hardwares;
    this.typeHardwares = typeHardwares;
    this.rams = rams;
    this.microProcessors = microProcessors;
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
          this.router.navigate(['']);
          this.myForm.reset();
          this.loadingService.setLoading(false);
        },
        error: (error) => {
          this.toastrService.error(message);
          this.loadingService.setLoading(false);
        },
      });
    } else {
      this.errorMessage = 'Form không hợp lệ vui lòng kiểm tra lại';
    }
  }
  public Editor = ClassicEditor;
}
