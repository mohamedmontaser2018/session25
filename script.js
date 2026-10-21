const steps = {
  welcome: document.getElementById("step-welcome"),
  signup: document.getElementById("step-signup"),
  success: document.getElementById("step-success"),
};

function showStep(name) {
  Object.values(steps).forEach((el) => el.classList.remove("active"));
  steps[name].classList.add("active");
}

document.getElementById("getStartedBtn").addEventListener("click", () => showStep("signup"));
document.getElementById("restartBtn").addEventListener("click", () => {
  document.getElementById("signupForm").reset();
  document.getElementById("formBanner").textContent = "Enter Data";
  document.getElementById("formBanner").className = "banner";
  showStep("welcome");
});

const form = document.getElementById("signupForm");
const banner = document.getElementById("formBanner");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  [username, email, password, confirmPassword].forEach((input) => input.classList.remove("invalid"));

  if (!username.value.trim()) {
    return fail(username, "Please enter a user name.");
  }
  if (!email.value.trim() || !email.value.includes("@")) {
    return fail(email, "Please enter a valid email.");
  }
  if (password.value.length < 6) {
    return fail(password, "Password must be at least 6 characters.");
  }
  if (password.value !== confirmPassword.value) {
    return fail(confirmPassword, "Passwords don't match.");
  }

  banner.textContent = "Account created!";
  banner.classList.add("ok");

  document.getElementById("successEmail").textContent = email.value.trim();

  setTimeout(() => showStep("success"), 500);
});

function fail(input, message) {
  input.classList.add("invalid");
  banner.textContent = message;
  banner.classList.remove("ok");
}
