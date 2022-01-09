const formElement = $("#login-form");

const handleSubmit = async (event) => {
  event.preventDefault();

  const email = $("#email-input").val();
  const password = $("#password-input").val();

  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  console.log(data);
};

formElement.on("submit", handleSubmit);
