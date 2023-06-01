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
import {
  brands,
  capacities,
  origins,
  typeMotorbikes,
} from '@core/values/motorbike';

@Component({
  selector: 'app-motorbike',
  templateUrl: './motorbike.component.html',
  styleUrls: ['./motorbike.component.scss'],
})
export class PostCreateMotorbikeComponent {
  categories: ISelect[] = [];
  brands: ISelect[] = [];
  typeMotorbikes: ISelect[] = [];
  origins: ISelect[] = [];
  capacities: ISelect[] = [];
  yearOfManufactures: ISelect[] = [];

  images: any[] = [];

  selectedCategory: string = 'Xe máy';
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
      categoryName: ['Xe máy'],
      type: ['Cần bán'],
      brand: ['Honda'],
      typeMotorbike: ['Tay ga'],
      origin: ['Việt Nam'],
      capacity: ['Dưới 50 cc'],
      yearOfManufacture: ['2023'],
      statusMotorbike: ['Mới'],
      numberOfKM: [0, Validators.min(0)],
      totalPrice: [0, Validators.min(0)],
      title: [null, Validators.required],
      content: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.categories = categories.filter(
      (category) => category.label !== this.selectedCategory
    );
    this.brands = brands;
    this.typeMotorbikes = typeMotorbikes;
    this.origins = origins;
    this.capacities = capacities;
    this.yearOfManufactures = yearOfManufactures;
    this.loadingService.setLoading(false);
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
