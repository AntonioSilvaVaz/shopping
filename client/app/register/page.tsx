"use client";
import "../login/loginAndRegister.css";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Notification from "../components/notification/notification";
import BackgroundImages from "../components/backgroundImages/backgroundImages";

export default function LoginPage() {
  const [message, setMessage] = useState<string>("");
  const notify = () => toast(message);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Failed Register");
    notify();
  };

  return (
    <section id="register">
      <Notification />
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              <h6>name</h6>
            </label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="email">
              <h6>email</h6>
            </label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">
              <h6>password</h6>
            </label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">
            <h5>Register</h5>
          </button>
        </form>
        <div>
          <h5>
            Already have an account?
            <br />
            <Link style={{ color: "white" }} href={"/login"}>
              <u>Login Now</u>
            </Link>
          </h5>
        </div>
      </div>

      <BackgroundImages />
    </section>
  );
}
