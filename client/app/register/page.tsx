"use client";
import "../login/loginAndRegister.css";
import { ChangeEvent, FormEvent, use, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import BackgroundImages from "../components/backgroundImages/backgroundImages";
import { registerUser } from "../utils/User";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [imgSelected, setImageSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await registerUser(formData);

    if(res.status === 200){
      toast('User registered');
      router.push('/login');
    } else if(res.status === 409){
      toast('User already registered');
    } else if(res.status === 500) {
      router.push('/500');
    }
  };

  const changeProfilePicture = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSelected(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="register" className="custom-section">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {
            imgSelected &&
            <img className="profile-picture" src={imgSelected} alt="ProfilePicture" />
          }
          <div>
            <label className="label-profile-picture" htmlFor="profile_picture">
              <h6>Select Profile picture</h6>
            </label>
            <input onChange={changeProfilePicture} type="file" accept="jpg png gif" id="profile_picture" name="profile_picture" />
          </div>
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
