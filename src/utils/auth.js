const AUTH_STORAGE_KEY = "student_panel_auth";

export function isAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function loginUser(email, password) {
  const validEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const validPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  if (email === validEmail && password === validPassword) {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    return { success: true };
  }
  
  return { success: false, error: "Invalid email or password" };
}

export function logoutUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
