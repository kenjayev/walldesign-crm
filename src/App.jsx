import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

/*********** ADMIN PAGES ***********/
import {
  AdminPanel,
  AdminProductPrice,
  AdminProducts,
  AdminShop,
  AdminStorage,
  AdminUsers,
} from "./pages/admin";
import AdminHome from "./pages/admin/AdminHome";

function App() {
  const user = { role: "admin" };
  const access_token = localStorage.getItem("access_token");
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        {access_token && user.role === "admin" && (
          <>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/admin-panel" element={<AdminPanel />}>
              <Route index path="storage" element={<AdminStorage />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="shop" element={<AdminShop />} />
              <Route path="product-price" element={<AdminProductPrice />} />
            </Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
