
export const _logoutUser = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return await res.json();
}


export const ssr = false;