'use client';
import "./loginAndRegister.css";
import { FormEvent } from "react";
import Link from "next/link";
import BackgroundImages from "../components/backgroundImages/backgroundImages";
import { toast } from "react-toastify";
import { loginUser } from "../utils/User";
import { login } from "../redux/user-reducer";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { UserInfo } from "../types";

export default function LoginPage() {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (email && password) {
      const res = await loginUser({ email, password });
      
      if(res.status === 500){
        router.push('/500');
      } else if(res.status !== 200) {        
        const message = await res.json();
        toast(message);
      } else {
        const data: UserInfo = await res.json();
        router.push('/my-profile');
        dispatch(login(data));
      };
    }

  };

  return (
    <section id="login" className="custom-section">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <h6>Email: </h6>
            </label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">
              <h6>Password: </h6>
            </label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">
            <h5>Login</h5>
          </button>
        </form>
        <div>
          <h5>
            Don't have an account?
            <br />
            <Link style={{ color: "white" }} href={"/register"}>
              <u>Register Now</u>
            </Link>
          </h5>
        </div>
      </div>
      <BackgroundImages />
    </section>
  );
}
