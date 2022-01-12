const loginForm = $("#login-form");
const signupForm = $("#signup-form");
const profileCard = $("#profile-card");

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

const handleProfile = (event) => {
  const target = $(event.target);

  const noButton = $("#no");
  const profileButton = $("#view-more");
  const yesButton = $("#yes");

  if (target.is(noButton)) {
    profileCard.remove();
    // need to make db request to fetch another users data
    // maybe controller to render this page can send random user on each load
  }

  if (target.is(yesButton)) {
    const id = yesButton.data("id");
    // db request to add to match table
    // flash alert (if user is matched)
    //  remove card
    profileCard.remove();
    // need to make db request to fetch another users data
    // maybe controller to render this page can send random user on each load
  }

  if (target.is(profileButton)) {
    const id = profileButton.data("id");
    window.location.assign(`/profile/${id}`);
  }
};

loginForm.on("submit", handleLogin);
signupForm.on("submit", handleSignup);
profileCard.on("click", handleProfile);
