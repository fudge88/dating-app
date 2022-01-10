const loginForm = $("#login-form");
const signupForm = $("#signup-form");

const handleLogin = async (event) => {
  event.preventDefault();

  const email = $("#email-input").val();
  const password = $("#password-input").val();

  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data.success) {
    window.location.replace("/dashboard");
  }
};

const handleSignup = async (event) => {
  event.preventDefault();

  const name = $("#username-input").val();
  const email = $("#email-input").val();
  const password = $("#password-input").val();
  const age = $("#age-input").val();
  const location = $("#location-input").val();

  const response = await fetch("/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, age, location }),
  });

  const data = await response.json();

  if (data.success) {
    window.location.replace("/login");
  }
};

loginForm.on("submit", handleLogin);
signupForm.on("submit", handleSignup);
