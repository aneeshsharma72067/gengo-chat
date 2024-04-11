type UserLoginData = {
  email: string;
  password: string;
};

export const _hanldeLogin = async (userData: UserLoginData) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const ssr = false;
