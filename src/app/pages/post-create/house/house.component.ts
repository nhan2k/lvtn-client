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

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly toastrService: ToastrService,
    private readonly notifyService: NotifyService,
    private readonly loadingService: LoadingService
  ) {
    this.myForm = this.formBuilder.group({
      categoryName: ['Nhà ở'],
      type: ['Cần bán', Validators.required],
      address: [null, Validators.required],
      codeHouse: [null, Validators.required],
      block: [null, Validators.required],
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
      title: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  ngOnInit(): void {
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
      try {
        this.loadingService.setLoading(true);
        for (const key in this.myForm.value) {
          if (Object.prototype.hasOwnProperty.call(this.myForm.value, key)) {
            const element = this.myForm.value[key];
            this.formData.append(key, element);
          }
        }
        this.postService
          .createPost(this.formData)
          .subscribe((response: any) => {
            this.toastrService.success('Tạo bài đăng thành công');
            this.notifyService.sendNotify(
              `Một bài đăng ${this.selectedCategory} được tạo ${JSON.stringify(
                response
              )}`
            );
            this.loadingService.setLoading(false);
            this.router.navigate(['']);
          });
        this.loadingService.setLoading(false);
      } catch (error) {
        this.toastrService.error('Tạo bài đăng thất bại');
      }
    } else {
      this.errorMessage = 'Form không hợp lệ vui lòng kiểm tra lại';
    }
  }
  public Editor = ClassicEditor;
}
