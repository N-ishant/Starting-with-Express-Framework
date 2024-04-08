const myForm = document.getElementById("my-form");
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const list = document.getElementById("list");

myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const amount = amountInput.value;
  const description = descriptionInput.value;
  const category = categoryInput.value;

  const expense = {
    amount,
    description,
    category,
  };

  axios
    .post("http://localhost:8000/add-expense", expense)
    .then((res) => {
      showExpenseOnScreen(res.data.newExpenseData);
      console.log(res);
    })
    .catch((error) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>Something went wrong</h4>";
      console.log(error);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:8000/get-expenses")
    .then((res) => {
      console.log(res);
      for (var i = 0; i < res.data.allExpenses.length; i++) {
        showExpenseOnScreen(res.data.allExpenses[i]);
      }
    })
    .catch((error) => console.log(error));
});

function showExpenseOnScreen(expense) {
  const li = document.createElement("li");
  const details = document.createTextNode(
    `${expense.amount} : ${expense.description} : ${expense.category}`
  );

  // DELETE BUTTON
  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "Delete";
  deleteBtn.style.color = "white";
  deleteBtn.style.backgroundColor = "Red";

  deleteBtn.onclick = () => {
    axios
      .delete(`http://localhost:8000/delete-expense/${expense.id}`)
      .then((res) => {
        console.log("Expense deleted successfully");
        list.removeChild(li);
      })
      .catch((error) => console.log(error));
  };

  // EDIT BUTTON
  const editBtn = document.createElement("input");
  editBtn.type = "button";
  editBtn.value = "Edit";
  editBtn.style.backgroundColor = "lightBlue";

  editBtn.onclick = () => {
    list.removeChild(li);
    document.getElementById("amount").value = expense.amount;
    document.getElementById("description").value = expense.description;
    document.getElementById("category").value = expense.category;

    //Replace the Existing Event Listener with new one
    myForm.removeEventListener("submit", onSubmit);

    myForm.addEventListener("submit", (e) => {
      console.log("Expense updated successfully");

      const updatedExpense = {
        amount: document.getElementById("amount").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
      };

      axios
        .put(`http://localhost:8000/edit-expense/${expense.id}`, updatedExpense)
        .then((res) => {
          //Update the user object
          expense.amount = updatedExpense.amount;
          expense.description = updatedExpense.description;
          expense.category = updatedExpense.category;
          //Update the details text node
          details.nodeValue = `${expense.amount} : ${expense.description} : ${expense.category}`;
          //Clear the form after updating
          amountInput.value = "";
          descriptionInput.value = "";
          categoryInput.value = "";
        })
        .catch((error) => console.log(error));

      //Restore the original Event Listener
      myForm.addEventListener("submit", onSubmit);
    });
  };

  li.appendChild(details);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  list.appendChild(li);

  // Clear Fields
  amountInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";
}