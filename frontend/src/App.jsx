import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import {
  HomePage,
  RecipesPage,
  RecipeDetailPage,
  RestaurantsPage,
  RestaurantDetailPage,
  IngredientsPage,
  IngredientDetailPage,
  StoresPage,
  StoreDetailPage,
  ProfilePage,
} from './pages';
import DemoPage from "./pages/demopage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="recipes/:id" element={<RecipeDetailPage />} />
          <Route path="restaurants" element={<RestaurantsPage />} />
          <Route path="restaurants/:id" element={<RestaurantDetailPage />} />
          <Route path="ingredients" element={<IngredientsPage />} />
          <Route path="ingredients/:id" element={<IngredientDetailPage />} />
          <Route path="stores" element={<StoresPage />} />
          <Route path="stores/:id" element={<StoreDetailPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="demo" element={<DemoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
