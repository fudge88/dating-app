const loginForm = $("#login-form");
const signupForm = $("#signup-form");
const profileCard = $("#profile-card");
const searchStartBtn = $("#search-start-btn");
const logout = $("#logout");

const getErrorsSignUp = ({
  name,
  email,
  password,
  confirmPassword,
  location,
  age,
  build,
  height,
  seriousness,
  gender,
  sexuality,
  aboutMe,
}) => {
  const errors = {};

  if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.email = "Invalid email address";
  }

  if (
    !password ||
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    )
  ) {
    errors.password = "Invalid password";
  }

  if (!confirmPassword || password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!location) {
    errors.location = "Location name is required";
  }

  if (!name) {
    errors.name = "Username is required";
  }

  if (!height || +height <= 0) {
    errors.height = "Height is required and cannot be 0";
  }

  if (!build) {
    errors.build = "Build is required";
  }

  if (!age || +age <= 0) {
    errors.age = "Age is required and cannot be 0";
  }

  if (!seriousness) {
    errors.seriousness = "Seriousness is required";
  }

  if (!gender) {
    errors.gender = "Gender is required";
  }

  if (!sexuality) {
    errors.sexuality = "sexual preference is required";
  }

  if (!aboutMe) {
    errors.aboutMe = "Short summary is required";
  }

  return errors;
};

const renderErrorMessages = (errors) => {
  const fields = [
    "name",
    "email",
    "password",
    "confirmPassword",
    "location",
    "age",
    "build",
    "height",
    "seriousness",
    "gender",
    "sexuality",
    "aboutMe",
  ];

  fields.forEach((field) => {
    const errorDiv = $(`#${field}-error`);

    if (errors[field]) {
      errorDiv.text(errors[field]);
    } else {
      errorDiv.text("");
    }
  });
};

const handleLogin = async (event) => {
  event.preventDefault();

  const email = $("#email-input").val();
  const password = $("#password-input").val();

  $("#login-error").text("");

  if (!email || !password) {
    $("#login-error").text("Please enter email and password");
  } else {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      window.location.assign("/search");
    } else {
      $("#login-error").text("Incorrect username or password");
    }
  }
};

const handleSignup = async (event) => {
  event.preventDefault();

  const name = $("#name-input").val();
  const email = $("#email-input").val();
  const password = $("#password-input").val();
  const confirmPassword = $("#confirmPassword-input").val();
  const age = $("#age-input").val();
  const location = $("#location-input").val();
  const build = $("#build-input").val();
  const height = $("#height-input").val();
  const seriousness = $("#seriousness-input").find(":selected").val();
  const gender = $("#gender-input").find(":selected").text();
  const sexuality = $("#sexuality-input").find(":selected").text();
  const aboutMe = $("#aboutMe-input").val();

  const errorMessages = getErrorsSignUp({
    name,
    email,
    password,
    confirmPassword,
    location,
    age,
    build,
    height,
    seriousness,
    gender,
    sexuality,
    aboutMe,
  });

  renderErrorMessages(errorMessages);

  if (!Object.keys(errorMessages).length) {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        location,
        age,
        build,
        height,
        seriousness,
        gender,
        sexuality,
        aboutMe,
      }),
    });

    const data = await response.json();

    if (data.success) {
      window.location.replace("/login");
    }
  }
};

const handleProfile = (event) => {
  const target = $(event.target);
  const id = target.data("id");
  window.location.assign(`/profile/${id}`);
};

const handleYes = async (event) => {
  const target = $(event.target);
  const selectedUserId = target.attr("data-id");
  console.log(selectedUserId);

  const response = await fetch("/api/match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedUserId }),
  });

  const { data } = await response.json();

  if (data.status === "MATCHED") {
    alert("Matched");
  } else {
    console.log("Match initiated");
  }

  $("#profile-card").remove();
  startSearch();
};

const handleNo = (event) => {
  const target = $(event.target);
  const id = target.data("id");
  // add id to local storage
  $("#profile-card").remove();
  startSearch();
};

const startSearch = async () => {
  // skips users that are logged in or yes or no'd
  const userIdsToSkip = JSON.parse(localStorage.getItem("userIdsToSkip")) || [];

  // get random user from API
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userIdsToSkip }),
  });

  const { data } = await response.json();

  if (data) {
    // construct profile card
    const parent = $("<div>");

    const profileCard = `<body class="background">
    <div class="profile-card card mx-auto m-5"style="width: 18rem;" id="profile-card">
      <div class="card-summary">
        <h5 class="profile-name">${data.name}, <b>${data.age}</b></h5>
        <h6 class="profile-location"><small>${data.location}</small></h6>
      </div>
        <a href="/profile/${data.id}">
        <img class="card-img-top" src="${data.img}" alt="Card image cap" />
        </a>
      <div class="card-body">  
        <div class="row">
          <div class="col-6"><b>Height:</b></div>
          <div class="col-6">${data.height}</div>
          <div class="w-100"></div>
          <div class="col-6"><b>Build:</b></div>
          <div class="col-6">${data.build}</div>
          <div class="w-100"></div>
          <div class="col-6"><b>Seriousness:</b></div>
          <div class="col-6">${data.seriousness}</div>
        </div>
        <hr>
          <div class="profile-bio mt-2">${data.about_me}</div>
        <hr>
        <div class="profile-links">
          <button type="button" id="no" data-id=${data.id} class="btn btn-style text-danger" ><i class="fas fa-times"></i></button>
          <button type="button" id="yes" data-id=${data.id} class="btn btn-style text-success"><i class="fas fa-check"></i></button>
        </div>
      </div>`;

    // append card to page
    $("#start-search").remove();
    parent.append(profileCard);
    $("#search-container").append(parent);

    // add event listeners on card buttons
    $("#no").on("click", handleNo);
    $("#view-more").on("click", handleProfile);
    $("#yes").on("click", handleYes);

    userIdsToSkip.push(data.id);
    localStorage.setItem("userIdsToSkip", JSON.stringify(userIdsToSkip));
  } else {
    console.log("TODO render no users");
  }
};

const handleLogout = async () => {
  const response = await fetch("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.success) {
    window.location.replace("/");
  }
};

loginForm.on("submit", handleLogin);
signupForm.on("submit", handleSignup);
profileCard.on("click", handleProfile);
searchStartBtn.on("click", startSearch);
logout.on("click", handleLogout);
