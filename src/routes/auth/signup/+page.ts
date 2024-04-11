type UserSignUpData = {
  email: string;
  password: string;
  username: string;
};

export const _hanldeSignup = async (userData: UserSignUpData) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const ssr = false;
