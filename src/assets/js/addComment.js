import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const removeBtn = document.querySelectorAll("#jsRemoveBtn");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

// Remove Comment

const removeComment = (event) => {
  const li = event.target.parentNode;
  li.remove();
  decreaseNumber();
};

const removeDB = async (comment, event) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment/remove`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    removeComment(event);
  }
};

const handleRemove = (event) => {
  const span = event.target.previousElementSibling.innerHTML;
  removeDB(span, event);
};

// Add Comment

const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  span.innerHTML = comment;
  button.id = "jsRemoveBtn";
  button.innerHTML = "❌";
  button.addEventListener("click", handleRemove);
  li.appendChild(span);
  li.appendChild(button);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  if (removeBtn !== null) {
    removeBtn.forEach((element) => {
      element.addEventListener("click", handleRemove);
    });
  }
}

if (addCommentForm) {
  init();
}
