import { ISelect } from '@core/interfaces/category';
import { balconnyDirections } from '../apartment';

export const typeGrounds: ISelect[] = [
  {
    label: 'Đất thổ cư',
    value: 'Đất thổ cư',
  },
  {
    label: 'Đất nền dự án',
    value: 'Đất nền dự án',
  },
  {
    label: 'Đất công nghiệp',
    value: 'Đất công nghiệp',
  },
  {
    label: 'Đất nông nghiệp',
    value: 'Đất nông nghiệp',
  },
];

export const groundDirections: ISelect[] = balconnyDirections;
