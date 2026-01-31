import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
// import { CitiesProvider } from "./contexts/CitiesContexts";
import CitiesProvider from "./contexts/CitiesContexts";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

const Homepage = lazy(()=> import("./pages/Homepage"))
const Product = lazy(()=> import("./pages/Product"))
const Pricing = lazy(()=> import("./pages/Pricing"))
const Login = lazy(()=> import("./pages/Login"))
const AppLayout = lazy(()=> import("./pages/AppLayout"))
const PageNotFound = lazy(()=> import("./pages/PageNotFound"))



function App() {


  return (
    <>
      <CitiesProvider>
        <AuthProvider>
          <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage/>}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              {/* AppLayout -> SideBar -> Logo , Appnav , footer */}
              <Route path="app" element={ <ProtectedRoute><AppLayout /></ProtectedRoute>}>

                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
            </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </CitiesProvider>
    </>
  )
}

export default App