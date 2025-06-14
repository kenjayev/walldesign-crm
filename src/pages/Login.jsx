import { useEffect, useState } from "react";
import Background from "../assets/background.jpg";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../service/api";
import { useUserStore } from "../store/user";

const Login = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useUserStore();
  useEffect(() => {
    if (user.role === "admin") navigate("admin");
  });
  const loginSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const body = {
        phone: e.target.phone.value,
        password: e.target.password.value,
      };

      const { data } = await api.post("/auth/login", body);
      if (data?.success) {
        localStorage.setItem("access_token", data.data?.accessToken);
        navigate("/");
      }

      console.log(data);
      setIsLoading(false);
    } catch (err) {
      if (err?.response?.data?.message === "User not found!")
        toast.error("Bunday loginli foydalanuvchi topilmadi!");
      else if (err?.response?.data?.message === "Invalid password")
        toast.error("Noto'g'ri parol!");
      else if (err?.response?.data?.message)
        toast.error(err?.response?.data?.message);
      else toast.error(err.message);

      console.log(err);
      setIsLoading(false);
    }
  };
  return (
    <div className="relative min-h-screen font-inter overflow-hidden">
      {/* Background */}
      <img
        src={Background}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Overlay (for darker background on mobile) */}
      <div className="absolute inset-0 bg-black/30 -z-10" />

      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen px-4 sm:px-6 lg:px-20 gap-4 sm:gap-10 sm:mb-5 mb-10">
        {/* Logo section */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex justify-center lg:justify-start lg:pl-15">
          <img
            src={Logo}
            alt="Logo"
            className="w-[300px] filter drop-shadow-[0_0_6.10697px_rgba(255,223,0,0.71)]"
          />
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-white/20 relative overflow-hidden">
          <div className="absolute inset-4 border-2 border-white/10 rounded-xl pointer-events-none"></div>
          <form onSubmit={loginSubmit}>
            {/* Title */}
            <h1 className="text-3xl font-bold mb-8 text-center text-white bg-clip-text">
              Kirish
            </h1>

            {/* Login */}

            <div className="mb-3">
              <label
                className="block text-white/80 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Login
              </label>
              <input
                required
                id="phone"
                name="phone"
                type="tel"
                placeholder="Logini kiriting!"
                className="w-full px-4 py-3 border-2 border-white/20 rounded-xl focus:outline-none focus:border-white/40 bg-white/10 text-white placeholder-white/50 transition-all duration-300"
              />
            </div>
            {/* Password */}
            <div className="mb-6">
              <label
                className="block text-white/80 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Parol
              </label>
              <span className="relative">
                <input
                  required
                  id="password"
                  name="password"
                  autoComplete="off"
                  type={isPasswordHidden ? "password" : "text"}
                  placeholder="Parolni kiriting!"
                  className="w-full px-4 py-3 pr-9 border-2 border-white/20 rounded-xl focus:outline-none focus:border-white/40 bg-white/10 text-white placeholder-white/50 transition-all duration-300"
                />

                <span
                  className="absolute right-4 text-xl text-white font-bold top-[50%] translate-y-[-50%] cursor-pointer"
                  onClick={() => setIsPasswordHidden((i) => !i)}
                >
                  {isPasswordHidden ? <FaEye /> : <FaEyeSlash />}
                </span>
              </span>
            </div>

            {/* Login Button */}
            <button
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-1 cursor-pointer py-3 px-6 rounded-xl bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:ring-offset-2 focus:ring-offset-yellow-100 transition-all duration-300 border-2 border-yellow-500/30 hover:border-yellow-500/50 shadow-lg hover:shadow-xl active:scale-95 disabled:bg-yellow-400 disabled:cursor-progress"
            >
              {isLoading && (
                <span class="inline-block h-4 w-4 border-3 border-t-transparent border-gray-900 rounded-full animate-spin"></span>
              )}
              {isLoading ? "Yuklanmoqda..." : "Kirish"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
