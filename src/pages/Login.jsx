import { useAuth } from "../contexts/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login(email, password, state);
      }}
      className="center-align-ver-hor border-all gray-border padding-all"
      style={{ width: "90%", maxWidth: "20rem" }}
    >
      <div className="font-size-3 margin-bottom text-center">Login</div>
      <div class="flex-column">
        <label class="font-size-6 font-bold-1">Email</label>
        <input
          type="email"
          class="text-input "
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div class="flex-column">
        <label class="font-size-6 font-bold-1">Password</label>
        <input
          type="password"
          class="text-input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <button className="btn btn-primary-contained full-width font-size-5">
          LOGIN
        </button>
      </div>
      <div className="margin-top text-center font-size-6">
        Don't have an account?
        <span
          className="text-color-primary font-bold-1 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </div>
    </form>
  );
}
