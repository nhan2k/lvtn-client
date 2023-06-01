import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ISelect } from '@core/interfaces/category';
import { categories } from '@core/values/categories';
import {
  brands,
  yearOfManufactures,
  carGearboxs,
  fuels,
  numOfSeats,
  colors,
} from '@core/values/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '@core/services/post.service';
import { ToastrService } from 'ngx-toastr';
import { NotifyService } from '@core/services/notify.service';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class PostCreateCarComponent {
  categories: ISelect[] = [];
  brands: ISelect[] = [];
  yearOfManufactures: ISelect[] = [];
  carGearboxs: ISelect[] = [];
  fuels: ISelect[] = [];
  numOfSeats: ISelect[] = [];
  colors: ISelect[] = [];

  images: any[] = [];

  selectedCategory: string = 'Xe hơi';
  errorMessage: string | null = null;

  myForm: FormGroup;

  formData: FormData = new FormData();

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly toastrService: ToastrService,
    private readonly notifyService: NotifyService,
    private readonly loadingService: LoadingService
  ) {
    this.myForm = this.formBuilder.group({
      categoryName: ['Xe hơi'],
      type: ['Cần bán'],
      brand: ['Toyota'],
      yearOfManufacture: ['2023'],
      carGearbox: ['Hộp số sàn MT'],
      fuel: ['Xăng'],
      numberOfSeats: ['2'],
      color: ['Đen'],
      statusCar: ['Mới'],
      numberOfKM: [0, Validators.min(0)],

      totalPrice: [0, Validators.min(0)],
      title: [null, Validators.required],
      content: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.categories = categories.filter(
      (category) => category.label !== this.selectedCategory
    );
    this.brands = brands;
    this.yearOfManufactures = yearOfManufactures;
    this.carGearboxs = carGearboxs;
    this.fuels = fuels;
    this.numOfSeats = numOfSeats;
    this.colors = colors;
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
      this.postService.createPost(this.formData).subscribe(
        (response: any) => {
          this.toastrService.success('Tạo bài đăng thành công');
          this.notifyService.sendNotify(
            `Một bài đăng ${this.selectedCategory} được tạo ${JSON.stringify(
              response
            )}`
          );
          this.loadingService.setLoading(false);
          this.router.navigate(['']);
        },
        (error) => {
          this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
          this.loadingService.setLoading(false);
        }
      );
    } else {
      this.errorMessage = 'Form không hợp lệ vui lòng kiểm tra lại';
    }
  }
  public Editor = ClassicEditor;
}
