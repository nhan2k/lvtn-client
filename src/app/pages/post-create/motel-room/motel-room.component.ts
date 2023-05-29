import { Component } from '@angular/core';
import { ISelect } from '@core/interfaces/category';
import { categories } from '@core/values/categories';
import { interiorConditions } from '@core/values/apartment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '@core/services/post.service';
import { ToastrService } from 'ngx-toastr';
import { NotifyService } from '@core/services/notify.service';
import { LoadingService } from '@core/services/loading.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-motel-room',
  templateUrl: './motel-room.component.html',
  styleUrls: ['./motel-room.component.scss'],
})
export class PostCreateMotelRoomComponent {
  categories: ISelect[] = [];
  interiorConditions: ISelect[] = [];

  images: any[] = [];

  selectedCategory: string = 'Phòng trọ';
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
      categoryName: ['Phòng trọ'],
      type: ['Cần bán'],
      address: [null, Validators.required],
      deposit: [0, Validators.min(0)],
      interiorCondition: ['Nội thất cao cấp'],
      area: [0, Validators.min(0)],
      totalPrice: [0, Validators.min(0)],
      imagePath: [null],
      title: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.categories = categories.filter(
      (category) => category.label !== this.selectedCategory
    );
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
          });
        this.loadingService.setLoading(false);
        this.router.navigate(['']);
      } catch (error) {
        this.toastrService.error('Tạo bài đăng thất bại');
      }
    } else {
      this.errorMessage = 'Form không hợp lệ vui lòng kiểm tra lại';
    }
  }
  public Editor = ClassicEditor;
}
