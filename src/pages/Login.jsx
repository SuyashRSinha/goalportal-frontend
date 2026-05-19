import { useEffect, useState } from "react";
import axios from "axios";

import { useMsal } from "@azure/msal-react";
import { fetchMicrosoftUserProfile } from "../services/microsoftService";

function Login() {

  const { instance, accounts } =
    useMsal();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  // MICROSOFT LOGIN

  const handleMicrosoftLogin =
    async () => {

      try {

        await instance.loginRedirect({

          scopes: [
            "openid",
            "profile",
            "User.Read",
            "User.ReadBasic.All",
  "Directory.Read.All"
          ]

        });

      }

      catch (error) {

        console.log(error);

        alert(
          "Microsoft Login Failed"
        );

      }
    };

  // MICROSOFT LOGIN SUCCESS

  /*useEffect(() => {
    const fetchProfile =
    async () => {

      if (accounts.length > 0) {

        try {

          const response =
            await instance.acquireTokenSilent({

              scopes: [
                "User.Read"
              ],

              account:
                accounts[0]

            });

          const profile =
            await fetchMicrosoftProfile(
              response.accessToken
            );

          console.log(profile);

          localStorage.setItem(
            "email",
            profile.mail ||
            profile.userPrincipalName
          );

          localStorage.setItem(
            "name",
            profile.displayName
          );

          localStorage.setItem(
            "department",
            profile.department || ""
          );

          localStorage.setItem(
            "jobTitle",
            profile.jobTitle || ""
          );

          // TEMP ROLE MAPPING

          let role = "EMPLOYEE";

          const email =
            profile.mail ||
            profile.userPrincipalName;

          if (
            email ===
            "admin@gmail.com"
          ) {

            role = "ADMIN";

          }

          else if (
            email ===
            "manager@gmail.com"
          ) {

            role = "MANAGER";

          }

          localStorage.setItem(
            "role",
            role
          );

          // REDIRECT

          if (role === "ADMIN") {

            window.location.href =
              "/admin-dashboard";

          }

          else if (
            role === "MANAGER"
          ) {

            window.location.href =
              "/manager-dashboard";

          }

          else {

            window.location.href =
              "/employee-dashboard";

          }

        }

        catch (error) {

          console.log(error);

        }

      }

    };

  fetchProfile();

}, [accounts]);*/

useEffect(() => {

  const fetchProfile =
    async () => {

      if (accounts.length > 0) {

        try {

          const tokenResponse =
            await instance.acquireTokenSilent({

              scopes: [
                "User.Read"
              ],

              account:
                accounts[0]

            });

          const profile =
            await fetchMicrosoftUserProfile(

              tokenResponse.accessToken

            );

          console.log(profile);

          // STORE DATA

          localStorage.setItem(
            "email",
            profile.mail ||
            profile.userPrincipalName
          );

          localStorage.setItem(
            "name",
            profile.displayName
          );

          localStorage.setItem(
            "department",
            profile.department || ""
          );

          localStorage.setItem(
            "jobTitle",
            profile.jobTitle || ""
          );

          // ROLE MAPPING

          let role = "EMPLOYEE";

          const email =
            profile.mail ||
            profile.userPrincipalName;

          if (
            email ===
            "admin@gmail.com"
          ) {

            role = "ADMIN";

          }

          else if (
            email ===
            "manager@gmail.com"
          ) {

            role = "MANAGER";

          }

          localStorage.setItem(
            "role",
            role
          );

          // REDIRECT

          if (role === "ADMIN") {

            window.location.href =
              "/admin-dashboard";

          }

          else if (
            role === "MANAGER"
          ) {

            window.location.href =
              "/manager-dashboard";

          }

          else {

            window.location.href =
              "/employee-dashboard";

          }

        }

        catch (error) {

          console.log(error);

        }

      }

    };

  fetchProfile();

}, [accounts]);



  // NORMAL LOGIN

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.post(
            "https://web-production-0f7c0.up.railway.app/auth/Login",
            {
              email,
              password
            }
          );

        console.log(
          "login email:",
          email
        );

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "email",
          email
        );

        localStorage.setItem(
          "role",
          response.data.role
        );

        localStorage.setItem(
          "name",
          response.data.name
        );

        console.log(
          "stored email:",
          localStorage.getItem("email")
        );

        const role =
          response.data.role.toLowerCase();

        if (role === "employee") {

          window.location.href =
            "/employee-dashboard";

        }

        else if (
          role === "manager"
        ) {

          window.location.href =
            "/manager-dashboard";

        }

        else if (
          role === "admin"
        ) {

          window.location.href =
            "/admin-dashboard";

        }

      }

      catch (error) {

        console.log(error);

        setError(
          "Invalid Email or Password"
        );

      }

    };

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#0f172a] flex items-center justify-center px-4">

      {/* BACKGROUND */}

      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-600 opacity-30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* MAIN CONTAINER */}

      <div className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SECTION */}

        <div className="hidden md:flex flex-col justify-center p-6 text-white bg-gradient-to-br from-blue-700/40 to-indigo-900/40">

          <div>

            <p className="uppercase tracking-[6px] text-sm text-blue-200 mb-4">
              AtomQuest Enterprise
            </p>

            <h1 className="text-xl font-bold leading-tight mb-6">
              Goal Tracking
              <br />
              & Performance Portal
            </h1>

            <p className="text-gray-300 text-sm leading-6 mb-8">
              Securely manage employee goals,
              quarterly reviews, approvals,
              and organizational performance
              from one intelligent platform.
            </p>

            <div className="flex gap-3 mt-8">

              <div>

                <h2 className="text-xl font-bold">
                  10K+
                </h2>

                <p className="text-gray-300 text-sm mt-1">
                  Goals Tracked
                </p>

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  95%
                </h2>

                <p className="text-gray-300 text-sm mt-1">
                  Efficiency
                </p>

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  24/7
                </h2>

                <p className="text-gray-300 text-sm mt-1">
                  Monitoring
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div className="bg-white p-6 md:p-6 flex flex-col justify-center">

          <div className="mb-10">

            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Welcome Back
            </h2>

            <p className="text-gray-500 text-sm">
              Login to continue to your dashboard.
            </p>

          </div>

          {
            error && (

              <div className="bg-red-100 border border-red-200 text-red-600 p-2.5 rounded-xl mb-6 text-center">

                {error}

              </div>

            )
          }

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="mb-6">

              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2.5 rounded-2xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            {/* PASSWORD */}

            <div className="mb-8">

              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2.5 rounded-2xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

            {/* NORMAL LOGIN */}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-2.5 rounded-2xl text-sm font-semibold shadow-xl hover:scale-[1.02] hover:shadow-2xl transition duration-300"
            >
              Login
            </button>

            {/* MICROSOFT LOGIN */}

            <button
              type="button"
              onClick={
                handleMicrosoftLogin
              }
              className="w-full mt-4 bg-[#111827] hover:bg-[#1f2937] border border-gray-700 text-white p-2.5 rounded-2xl font-semibold flex items-center justify-center gap-3 transition duration-300"
            >

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                alt="Microsoft"
                className="w-5 h-5"
              />

              Sign in with Microsoft

            </button>

          </form>

          <p className="text-center text-gray-400 text-sm mt-8">
            Secure enterprise authentication system
          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;
