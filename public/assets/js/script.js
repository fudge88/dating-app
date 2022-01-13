const loginForm = $("#login-form");
const signupForm = $("#signup-form");
const profileCard = $("#profile-card");
const searchStartBtn = $("#search-start-btn");
const logout = $("#logout");

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
    window.location.replace("/search");
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
  const id = target.data("id");
  window.location.assign(`/profile/${id}`);
};

const handleYes = (event) => {
  const target = $(event.target);
  const id = target.data("id");
  // db request to add to match table
  // flash alert (if user is matched)
  //  remove card
  $("#profile-card").remove();
  startSearch();
  // need to make db request to fetch another users data
  // maybe controller to render this page can send random user on each load
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

    const profileCard = `<div class="profile-card card mx-auto m-5"style="width: 18rem;" id="profile-card">
  <img class="card-img-top p-2" src="https://via.placeholder.com/300x300" alt="Card image cap" />
  <div class="card-body">  
    <h5 class="profile-name">${data.name}, ${data.age}</h5>
    <h6 class="profile-location"><b>${data.location}</b></h6>
        <div class="profile-height"> <b>Height: </b>${data.height}m</div>
        <div class="profile-build"><b>Build: </b> ${data.build}</div>
        <div class="profile-serious"><b>Seriousness: </b>${data.seriousness}
        </div>
    <div class="profile-bio">
<b>Bio:</b>  ${data.about_me}
    </p>
  </div>
  <div class="profile-links">
      <button type="button" id="no" data-id=${data.id} class="btn btn-danger" >No</button>
     <a href="/profile/${data.id}" class="class="btn btn-primary"> View Profile </a>
          <button type="button" id="yes" data-id= ${data.id} class="btn btn-success">Yes</button>
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
