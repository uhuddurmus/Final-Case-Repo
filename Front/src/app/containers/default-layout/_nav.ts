import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Products',
  },
  {
    name: 'Products',
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
  {
    title: true,
    name: 'Messages',
  },
  {
    name: 'Messages',
    url: '/chat',
    iconComponent: { name: 'cilEnvelopeOpen' },
  },
  {
    title: true,
    name: 'Report',
  },
  {
    name: 'Reports',
    url: '/report',
    iconComponent: { name: 'cil-notes' },
  },
  {
    title: true,
    name: 'Users',
  },
  {
    name: 'Users',
    url: '/users',
    iconComponent: { name: 'cilUser' },
  },
];
