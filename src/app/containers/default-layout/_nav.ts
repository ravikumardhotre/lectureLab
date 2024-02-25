import { INavData } from '@coreui/angular';

export const UserItems: INavData[] = [
  {
    name: 'Instructor',
  },
  
  {
    name: 'My Lectures',
    url: '/assigned-batches',
    iconComponent: { name: 'cil-list' }
  },
 
];

export const AdminItems: INavData[] = [
  {
    name: 'Super Admin',
  },
  
  {
    name: 'All Instructors',
    url: '/all-instructor',
    iconComponent: { name: 'cil-list' }
  },
  {
    name: 'Add Instructor',
    url: '/register-instructor',
    iconComponent: { name: 'cil-pen' }
  },

  {
    name: 'Add Course',
    url: '/add-course',
    iconComponent: { name: 'cil-pen' }
  },
  

  {
    name: 'Assign Batch',
    url: '/assign-batch',
    iconComponent: { name: 'cil-pen' }
  },
];



