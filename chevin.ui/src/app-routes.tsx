import { withNavigationWatcher } from './contexts/navigationContext';
import VehicleListPage from './pages/vehicleList/index';
import VehicleDetailsPageProps from './pages/vehicleDetails/index';

type Route = {
    path: string;
    component: any
 }
  
 const routes: Route[] = [
    {
        path: '/',
        component: VehicleListPage
    },
    {
        path: '/details/:id',
        component: VehicleDetailsPageProps
    }
];

export default routes.map(route => {
    return {
      ...route,
      component: withNavigationWatcher(route.component)
    };
});