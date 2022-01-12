const loginForm = $("#login-form");
const signupForm = $("#signup-form");
const profileCard = $("#profile-card");
const searchStartBtn = $("#search-start-btn");

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
  // get ids from local storage
  // construct post body with list of ids to remove

  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userIdsToSkip: [2, 4, 6] }),
  });

  const { userData } = await response.json();

  const profileCard = ` <div class="profile-card card mx-auto m-5"style="width: 18rem;" id="profile-card">
  <img class="card-img-top p-2" src="https://via.placeholder.com/300x300" alt="Card image cap" />
  <div class="card-body">  
    <h5 class="profile-name">${userData.name}, ${userData.age}</h5>
    <h6 class="profile-location"><b>${userData.location}</b></h3>
        <div class="profile-height"> <b>Height: </b>${userData.height}m</div>
        <div class="profile-build"><b>Build: </b> ${userData.build}</div>
        <div class="profile-serious"><b>Seriousness: </b>${userData.seriousness}
        </div>
    <div class="profile-bio">
<b>Bio:</b>  ${userData.about_me}
    </p>
  </div>
  <div class="profile-links">
      <button type="button" id="no" data-id=${userData.id} class="btn btn-danger" >No</button>
     <button type="button" id="view-more" data-id= ${userData.id} class="btn btn-info"> View Profile </button>
          <button type="button" id="yes" data-id= ${userData.id} class="btn btn-success">Yes</button>
      </div>
 </div>`;

  $("#search-container").empty();
  console.log(userData.id);
  $("#search-container").append(profileCard);

  $("#no").on("click", handleNo);
  $("#view-more").on("click", handleProfile);
  $("#yes").on("click", handleYes);
};

loginForm.on("submit", handleLogin);
signupForm.on("submit", handleSignup);
profileCard.on("click", handleProfile);
searchStartBtn.on("click", startSearch);
