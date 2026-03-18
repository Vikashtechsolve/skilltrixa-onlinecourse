const AUTH_STORAGE_KEY = "student_panel_auth";

export function isAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function loginUser() {
  localStorage.setItem(AUTH_STORAGE_KEY, "true");
}

export function logoutUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
