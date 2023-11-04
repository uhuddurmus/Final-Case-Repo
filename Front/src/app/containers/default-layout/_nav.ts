import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Product',
    url: '/dashboard',
    iconComponent: { name: 'cil-calculator' },
  },
  {
    title: true,
    name: 'Orders',
  },
  {
    name: 'Orders',
    url: '/order',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'List',
        url: '/order/list',
      },
    ],
  },
];
