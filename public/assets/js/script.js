const loginForm = $("#login-form");
const signupForm = $("#signup-form");
const profileCard = $("#profile-card");
const searchStartBtn = $("#search-start-btn");
const restartContainer = $("#restart-container");
const updateModalContainer = $(".updateModal-container");
const logout = $("#logout");
const deleteUserMatchBtn = $("#delete-user-match");
const updateBtn = $('button[name="updateBtn"]');

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

  if (!age || +age <= 17) {
    errors.age = "Age is required and cannot be under 18";
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
      window.location.assign("/profile");
    } else {
      $("#login-error").text("Incorrect username or password");
    }
  }
};

const handleSignup = async (event) => {
  event.preventDefault();

  const name = $("#name-input").val().trim();
  const email = $("#email-input").val().trim();
  const password = $("#password-input").val();
  const confirmPassword = $("#confirmPassword-input").val();
  const age = $("#age-input").val();
  const location = $("#location-input").val().trim();
  const build = $("#build-input").find(":selected").val();
  const height = $("#height-input").val();
  const seriousness = $("#seriousness-input").find(":selected").val();
  const gender = $("#gender-input").find(":selected").text();
  const sexuality = $("#sexuality-input").find(":selected").text();
  const aboutMe = $("#aboutMe-input").val();
  const img = $("#img-input").val();

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
    img,
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
        img,
      }),
    });

    const data = await response.json();

    if (data.success) {
      window.location.replace("/login");
    }
  }
};

const handleYes = async (event) => {
  const target = $(event.target);
  const selectedUserId = target.attr("data-id");

  const response = await fetch("/api/match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedUserId }),
  });

  const { data } = await response.json();

  if (data.status === "MATCHED") {
    renderModal();
  }

  $("#profile-card").remove();
  startSearch();
};

const updateUser = async (event) => {
  event.preventDefault();

  const updatedUser = {
    name: $("#name-input").val(),
    location: $("#location-input").val(),
    age: $("#age-input").val(),
    build: $("#build-input").find(":selected").val(),
    height: $("#height-input").val(),
    gender: $("#gender-input").find(":selected").val(),
    sexuality: $("#sexuality-input").find(":selected").val(),
    seriousness: $("#seriousness-input").find(":selected").text(),
    aboutMe: $("#aboutMe-input").val(),
  };

  const id = $("#update-form").attr("data-userId");
  const response = await fetch(`/api/profile/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  const { success } = await response.json();

  if (success) {
    window.location.reload();
  }
};

const renderUpdateModal = async (event) => {
  const userId = $(event.target).attr("id");
  const response = await fetch(`/api/profile/${userId}`);

  const { user } = await response.json();
  if (user) {
    const modal = `<div class="container">
    <div class="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center">
            <h1 class="text-center">Update Information</h1>
            <hr />
            <form id="update-form" data-userId=${user.id} class="p-4">
              <div class="row">
                <div class="mb-3 col-md-6 col-12">
                  <label for="name-input" class="form-label">Name</label>
                  <input type="text" class="form-control" value="${
                    user.name
                  }" id="name-input" />
                  <div class="form-text error" id="name-error"></div>
                </div>
                <div class="mb-3 col-md-6 col-12">
                  <label for="img-input" class="form-label">Image</label>
                  <input type="text" class="form-control" value=${
                    user.img
                  } id="img-input" />
                  <div class="form-text error" id="img-error"></div>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6 col-12">
                  <label for="age-input" class="form-label">Age</label>
                  <input type="number" class="form-control" value="${
                    user.age
                  }" id="age-input" />
                  <div class="form-text error" id="age-error"></div>
                </div>
                <div class="mb-3 col-md-6 col-12">
                  <label for="location-input" class="form-label">Location</label>
                  <input type="text" value="${
                    user.location
                  }" class="form-control" id="location-input" />
                  <div class="form-text error" id="location-error"></div>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6 col-12">
                  <label class="form-label" for="build-input">Build</label>
                  <select class="form-select" id="build-input">
                    <option disabled> Build </option>
                    <option value="Slim" ${
                      user.build == "Slim" ? "selected" : ""
                    }>Slim</option>
                    <option value="Athletic" ${
                      user.build == "Athletic" ? "selected" : ""
                    }>Athletic</option>
                    <option value="Medium" ${
                      user.build == "Medium" ? "selected" : ""
                    }>Medium</option>
                    <option value="Curvy" ${
                      user.build == "Curvy" ? "selected" : ""
                    }>Curvy</option>
                    <option value="Large" ${
                      user.build == "Large" ? "selected" : ""
                    }>Large</option>
                  </select>
                  <div class="form-text error" id="build-error"></div>
                </div>
                <div class="mb-3 col-md-6 col-12">
                  <label for="height-input" class="form-label">Height (M)</label>
                  <input type="number" step="0.01" value=${
                    user.height
                  } min="0" class="form-control" id="height-input" />
                  <div class="form-text error" id="height-error"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 col-12">
                  <label class="visually-hidden" for="autoSizingSelect">Gender</label>
                  <select class="form-select" id="gender-input">
                    <option disabled>Gender</option>
                    <option value="Male" ${
                      user.gender == "Male" ? "selected" : ""
                    }>Male</option>
                    <option value="Female" ${
                      user.gender == "Female" ? "selected" : ""
                    }>Female</option>
                    <option value="Other" ${
                      user.gender == "Other" ? "selected" : ""
                    }>Other</option>
                  </select>
                  <div class="form-text error" id="gender-error"></div>
                </div>
                <div class="col-md-4 col-12">
                  <label class="visually-hidden" for="autoSizingSelect">Sexuality</label>
                  <select class="form-select" id="sexuality-input">
                    <option disabled>Sexuality</option>
                    <option value="Straight" ${
                      user.sexuality == "Straight" ? "selected" : ""
                    }>Straight</option>
                    <option value="Bisexual" ${
                      user.sexuality == "Bisexual" ? "selected" : ""
                    }>Bisexual</option>
                    <option value="Gay" ${
                      user.sexuality == "Gay" ? "selected" : ""
                    }>Gay</option>
                    <option value="Other" ${
                      user.sexuality == "Other" ? "selected" : ""
                    }>Other</option>
                  </select>
                  <div class="form-text error" id="sexuality-error"></div>
                </div>
                <div class="col-md-4 col-12">
                  <label class="visually-hidden" for="autoSizingSelect">Seriousness</label>
                  <select class="form-select" id="seriousness-input">
                    <option disabled>Seriousness</option>
                    <option value="Fling Ting" ${
                      user.seriousness == "Fling Ting" ? "selected" : ""
                    }>Fling Ting</option>
                    <option value="Let's see where this goes" ${
                      user.seriousness == "Dating" ? "selected" : ""
                    }>Dating
                    </option>
                    <option value="Marry Me" ${
                      user.seriousness == "Marry Me" ? "selected" : ""
                    }>Marry Me</option>
                  </select>
                  <div class="form-text error" id="seriousness-error"></div>
                </div>
              </div>
              <div class="row">
                <div class="mb-3">
                  <label for="aboutMe-input" class="form-label mt-4">About Me </label>
                  <textarea cols="30" rows="10" type="text" class="form-control"
                    id="aboutMe-input">${user.aboutMe}</textarea>
                  <div class="form-text error" id="aboutMe-error"></div>
                </div>
              </div>
              <button type="submit" class="btn btn-styling" data-bs-dismiss="modal" id="update-btn">
                Update Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    updateModalContainer.append(modal);
    $(".modal").modal("show");
  }

  $("#update-form").on("submit", updateUser);
};

const renderModal = () => {
  const loadModal = `<div class="modal fade is-active" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body text-center">
        It's a MATCH 💕
        <div><img src="https://c.tenor.com/WogtNEb_jCwAAAAC/match-perfect.gif" alt="this slowpoke moves"  width="250" /></div>
      </div>
      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-styling mb-2" data-bs-dismiss="modal">Continue browsing..</button>
      </div>
    </div>
  </div>
</div>`;
  $("#modal-container").append(loadModal);
  $(".modal").modal("show");
};

const handleNo = (event) => {
  const target = $(event.target);
  const id = target.data("id");
  // add id to local storage
  $("#profile-card").remove();
  startSearch();
};

const getRandomQuote = async () => {
  const response = await fetch("https://api.quotable.io/random/?tags=love");
  const quote = await response.json();
  const { content } = quote || {};
  return content;
};

const startSearch = async () => {
  const loveQuote = await getRandomQuote();
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
    const profileCard = `<div class="text-center bg-white p-4 w-10">${loveQuote}</div><div class="profile-card card mx-auto m-5"style="width: 18rem;" id="profile-card">
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
          <div class="col-6">${data.height} m</div>
          <div class="w-100"></div>
          <div class="col-6"><b>Build:</b></div>
          <div class="col-6">${data.build}</div>
          <div class="w-100"></div>
          <div class="col-6"><b>Seriousness:</b></div>
          <div class="col-6">${data.seriousness}</div>
        </div>
        <hr>
          <div class="profile-bio mt-2">${data.aboutMe}</div>
        <hr>
        <div class="profile-links">
          <button type="button" id="no" data-id=${data.id} class="btn btn-style text-danger" ><i class="fas fa-times"></i></button>
          <button type="button" id="yes" data-id=${data.id} class="btn btn-style text-success"><i data-id=${data.id} class="fas fa-check"></i></button>
        </div>
      </div>
    </div>`;

    $("#search-container").empty();

    $("#search-container").append(profileCard);

    $("#no").on("click", handleNo);
    $("#yes").on("click", handleYes);

    userIdsToSkip.push(data.id);
    localStorage.setItem("userIdsToSkip", JSON.stringify(userIdsToSkip));
  } else {
    $("#search-container").empty();

    const renderCard = `<div class="jumbotron-styling m-3" id="start-search">
          <h1 class="display-4 pink-text">Hello again!</h1>
          <p class="lead"> You've reached the end of the line!
          </p>
          <hr class="my-4" />
          <h5> Ready to give love a second chance? You've ran out of matches!</h5>
          <button class="btn btn-styling mt-2" id="search-start-btn">Here we go again! 👀
          </button>`;

    $("#search-container").append(renderCard);

    const clearLocalStorage = () => {
      localStorage.clear();
      startSearch();
    };

    $("#search-start-btn").on("click", clearLocalStorage);
  }
};

const deleteMatch = async (event) => {
  const id = $(event.target).attr("data-matchId");
  const response = await fetch(`/api/match/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { success } = await response.json();
  if (success) {
    window.location.reload();
  }
};

const handleLogout = async () => {
  localStorage.removeItem("userIdsToSkip");
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
searchStartBtn.on("click", startSearch);
logout.on("click", handleLogout);
deleteUserMatchBtn.on("click", deleteMatch);
updateBtn.on("click", renderUpdateModal);
