import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsTools } from 'react-icons/bs';
import { FiPieChart } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiDashboardLine } from 'react-icons/ri';
import { RiCommunityLine } from 'react-icons/ri';
import { RiRoadMapLine } from 'react-icons/ri';
import { RiMapPin2Line } from 'react-icons/ri';
import { RiCurrencyLine } from 'react-icons/ri';

export const menuOptions = [
  {
    path: '/admin/dashboard',
    icon: <RiDashboardLine size={20} />,
    label: 'Dashboard',
  },
  {
    path: '/admin/tools',
    icon: <BsTools size={20} />,
    label: 'Tools',
  },
  {
    path: '/admin/account',
    icon: <FiPieChart size={20} />,
    label: 'Account',
  },
  {
    path: '/admin/neighbors',
    icon: <RiCommunityLine size={20} />,
    label: 'Neighbors',
  },
  {
    path: '/admin/deliveries',
    icon: <RiMapPin2Line size={20} />,
    label: 'Deliveries',
  },
  {
    path: '/admin/pickups',
    icon: <RiRoadMapLine size={20} />,
    label: 'Pickups',
  },
  {
    path: '/admin/payouts',
    icon: <RiCurrencyLine size={20} />,
    label: 'Payouts',
  },
  {
    path: '/admin/settings',
    icon: <AiOutlineSetting size={20} />,
    label: 'Settings',
  },
  {
    path: '/admin/profile',
    icon: <FaRegUserCircle size={20} />,
    label: 'Profile',
  },
];
