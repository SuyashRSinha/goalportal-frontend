import { useEffect }
from "react";

import { useMsal }
from "@azure/msal-react";

function MicrosoftLogin() {

  const { instance, accounts } =
    useMsal();

  useEffect(() => {

    if (accounts.length > 0) {

      const email =
        accounts[0].username;

      localStorage.setItem(
        "email",
        email
      );

      // ROLE MAPPING

      let role = "EMPLOYEE";

      if (
        email === "admin@gmail.com"
      ) {

        role = "ADMIN";

      }

      else if (
        email === "manager@gmail.com"
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

  }, [accounts]);

  const handleLogin = async () => {

    try {

      await instance.loginRedirect({

        scopes: [
          "openid",
          "profile",
          "User.Read"
        ]

      });

    }

    catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold"
      >
        Login with Microsoft
      </button>

    </div>

  );
}

export default MicrosoftLogin;