import { ISelect } from '@core/interfaces/category';

export const typeOfBuildings: ISelect[] = [
  {
    label: 'Chung cư',
    value: 'Chung cư',
    selected: true,
  },
  {
    label: 'Duplex',
    value: 'Duplex',
  },
  {
    label: 'Penthouse',
    value: 'Penthouse',
  },
  {
    label: 'Căn hộ dịch vụ, mini',
    value: 'Căn hộ dịch vụ, mini',
  },
  {
    label: 'Tập thể cư xá',
    value: 'Tập thể cư xá',
  },
  {
    label: 'Officetel',
    value: 'Officetel',
  },
];

export const balconnyDirections: ISelect[] = [
  {
    label: 'Đông',
    value: 'Đông',
  },
  {
    label: 'Tây',
    value: 'Tây',
  },
  {
    label: 'Nam',
    value: 'Nam',
  },
  {
    label: 'Bắc',
    value: 'Bắc',
  },
  {
    label: 'Đông bắc',
    value: 'Đông bắc',
  },
  {
    label: 'Đông nam',
    value: 'Đông nam',
  },
  {
    label: 'Tây bắc',
    value: 'Tây bắc',
  },
  {
    label: 'Tây nam',
    value: 'Tây nam',
  },
];

export const doorDirections: ISelect[] = balconnyDirections;

export const interiorConditions: ISelect[] = [
  {
    label: 'Nội thất cao cấp',
    value: 'Nội thất cao cấp',
  },
  {
    label: 'Nội thất đầy đủ',
    value: 'Nội thất đầy đủ',
  },
  {
    label: 'Hoàn thiện cơ bản',
    value: 'Hoàn thiện cơ bản',
  },
  {
    label: 'Bàn giao thô',
    value: 'Bàn giao thô',
  },
];

export const juridicals: ISelect[] = [
  {
    label: 'Đã có sổ',
    value: 'Đã có sổ',
  },
  {
    label: 'Đang chờ sổ',
    value: 'Đang chờ sổ',
  },
  {
    label: 'Giấy tờ khác',
    value: 'Giấy tờ khác',
  },
];
