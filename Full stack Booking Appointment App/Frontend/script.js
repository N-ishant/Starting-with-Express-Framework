let myForm = document.getElementById("my-form");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let mobileInput = document.getElementById("mobile");
let mssg = document.querySelector(".msg");
let userList = document.getElementById("users");

myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const mobile = e.target.mobile.value;

  const user = {
    name,
    email,
    mobile,
  };

  //Sending a POST Request to CRUD API
  axios
    .post("http://localhost:3000/users/insert-user", user)
    .then((res) => {
      showUserOnScreen(res.data.newUserDetail);
      console.log(res);
    })
    .catch((error) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>Something went wrong</h4>";
      console.log(error);
    });
}

//Sending a GET Request to CRUD API
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/users/get-users")
    .then((res) => {
      console.log(res);
      for (var i = 0; i < res.data.allUsers.length; i++) {
        showUserOnScreen(res.data.allUsers[i]);
      }
    })
    .catch((error) => console.log(error));
});

function showUserOnScreen(user) {
  let li = document.createElement("li");
  let details = document.createTextNode(
    `${user.name} : ${user.email} : ${user.mobile}`
  );

  let deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "Delete";
  deleteBtn.style.backgroundColor = "lightPink";
  deleteBtn.onclick = () => {
    //Sending a DELETE Request to CRUD API
    axios
      .delete(`http://localhost:3000/users/delete-user/${user.id}`)
      .then((res) => {
        console.log("User deleted successfully");
        userList.removeChild(li);
      })
      .catch((error) => console.log(error));
  };

  let editBtn = document.createElement("input");
  editBtn.type = "button";
  editBtn.value = "Edit";
  editBtn.style.backgroundColor = "lightBlue";
  editBtn.onclick = () => {
    userList.removeChild(li);
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("mobile").value = user.mobile;

    //Replace the Existing Event Listener with new one
    myForm.removeEventListener("submit", onSubmit);

    myForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("User updated successfully");

      const updatedUser = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
      };

      axios
        .put(`http://localhost:3000/users/edit-user/${user.id}`, updatedUser)
        .then((res) => {
          //Update the user object
          user.name = updatedUser.name;
          user.email = updatedUser.email;
          user.mobile = updatedUser.mobile;
          //Update the details text node
          details.nodeValue = `${user.name} : ${user.email} : ${user.mobile}`;
          //Clear the form after updating
          nameInput.value = "";
          emailInput.value = "";
          mobileInput.value = "";
        })
        .catch((error) => console.log(error));

      //Restore the original Event Listener
      myForm.addEventListener("submit", onSubmit);
    });
  };

  li.appendChild(details);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  userList.appendChild(li);

  //Clear Fields
  nameInput.value = "";
  emailInput.value = "";
  mobileInput.value = "";
}