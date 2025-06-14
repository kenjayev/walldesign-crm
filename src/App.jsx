import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useUserStore } from "./store/user";
import api from "./service/api";

function App() {
  // const user = { role: "admin" };
  const navigate = useNavigate();
  const location = useLocation();

  const access_token = localStorage.getItem("access_token");
  const { user, setUser } = useUserStore();
  useEffect(() => {
    if (access_token && !user?.role) {
      api
        .get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          if (
            res.data.success &&
            location.pathname === "/" &&
            res.data.data.role === "admin"
          ) {
            setUser(res.data.data);
            navigate("/admin");
          }
        });
    }
    console.log("Login bo'ldi");
  }, [access_token, navigate]);

  return (
    <>
      <ToastContainer />
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
