import { ISelect } from '@core/interfaces/category';

export const typeHouses: ISelect[] = [
  {
    label: 'Nhà mặt phố, mặt tiền',
    value: 'Nhà mặt phố, mặt tiền',
  },
  {
    label: 'Nhà ngõ, hẻm',
    value: 'Nhà ngõ, hẻm',
  },
  {
    label: 'Nhà biệt thự',
    value: 'Nhà biệt thự',
  },
  {
    label: 'Nhà phố liền kề',
    value: 'Nhà phố liền kề',
  },
];

export const numOfBedrooms: ISelect[] = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '5',
    value: '5',
  },
  {
    label: 'Nhiều hơn 5',
    value: 'Nhiều hơn 5',
  },
];

export const numOfBathrooms = numOfBedrooms;
export const numOfFloors = numOfBedrooms;
