import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './index';

const AppRouter: React.FC = () => {
	return (
		<Routes>
			{publicRoutes.map(route => (
				<Route
					element={
						<Suspense fallback={<div>Loading...</div>}>
							{route.element}
						</Suspense>
					}
					path={route.path}
					key={route.path}
				/>
			))}
		</Routes>
	);
};

export default AppRouter;
