import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postStatus',
})
export class postStatusPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value === 'hide' ? 'Đang ẩn' : 'Đang hiện';
  }
}

@Pipe({
  name: 'postIsReview',
})
export class postIsReviewPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value ? 'Đã duyệt' : 'Chưa duyệt';
  }
}

@Pipe({
  name: 'postCurrency',
})
export class postCurrencyPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
}

@Pipe({
  name: 'keyOfCategory',
})
export class keyOfCategoryPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    switch (value) {
      case 'typePost':
        return 'Loại bài đăng';
      case 'brand':
        return 'Thương hiệu';
      case 'carGearbox':
        return 'Hộp số';
      case 'numberOfSeats':
        return 'Số chỗ ngồi';
      case 'statusCar':
        return 'Tình trạng xe';
      case 'type':
        return 'Loại';
      case 'yearOfManufacture':
        return 'Năm sản xuất';
      case 'fuel':
        return 'Nhiên liệu';
      case 'color':
        return 'Màu sắc';
      case 'numberOfKM':
        return 'Số KM đã đi';
      case 'nameOfBuilding':
        return 'Tên tòa nhà';
      case 'codeOfBuilding':
        return 'Mã tòa nhà';
      case 'block':
        return 'Block / Tháp';
      case 'floor':
        return 'Tầng';
      case 'typeOfBuilding':
        return 'Loại hình căn hộ';
      case 'numberOfBedroom':
        return 'Số phòng ngủ';
      case 'numberOfBathroom':
        return 'Số phòng tắm';
      case 'balconnyDirection':
        return 'Hướng ban công';
      case 'doorDirection':
        return 'Hướng cửa chính';
      case 'interiorCondition':
        return 'Tình trạng nội thất';
      case 'juridical':
        return 'Giấy tờ pháp lý';
      case 'area':
        return 'Diện tích (m2)';
      case 'address':
        return 'Địa chỉ';
      case 'codeHouse':
        return 'Số nhà';
      case 'typeHouse':
        return 'Loại';
      case 'numberOfFloor':
        return 'Số tầng';
      case 'height':
        return 'Chiều dài (m2)';
      case 'width':
        return 'Chiều rộng (m2)';
      case 'typeGround':
        return 'Loại đất';
      case 'groundDirection':
        return 'Hướng đất';
      case 'typeMotorbike':
        return 'Loại';
      case 'capacity':
        return 'Dung tích';
      case 'statusMotorbike':
        return 'Tình trạng';
      case 'origin':
        return 'Xuất xứ';
      case 'typeOffice':
        return 'Loại hình';
      case 'typeElectricBicycle':
        return 'Loại';
      case 'engine':
        return 'Động cơ';
      case 'statusElectricBicycle':
        return 'Tình trạng';
      case 'guarantee':
        return 'Bào hành';
      case 'deposit':
        return 'Tiền cọc';
      case 'microProcessor':
        return 'Vi xử lý';
      case 'statusLaptop':
        return 'Tình trạng';
      case 'ram':
        return 'RAM';
      case 'hardware':
        return 'Dung lượng ổ cứng';
      case 'typeHardware':
        return 'Loại ổ cứng';
      default:
        return value;
    }
  }
}
