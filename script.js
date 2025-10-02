// Load posts from localStorage
document.addEventListener("DOMContentLoaded", function() {
  const postList = document.getElementById("post-list");
  const postForm = document.getElementById("postForm");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let editIndex = -1; // -1 means no edit in progress

  function renderPosts() {
    postList.innerHTML = "";
    if (posts.length === 0) {
      postList.innerHTML = "<p>No posts yet. Write something! 😊</p>";
    }
    posts.forEach((post, index) => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>Posted on: ${post.date}</small><br>
        <button class="edit-btn" data-index="${index}">✏️ Edit</button>
        <button class="delete-btn" data-index="${index}">🗑️ Delete</button>
      `;
      postList.appendChild(postDiv);
    });

    // Attach delete events
    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", function() {
        const index = this.getAttribute("data-index");
        deletePost(index);
      });
    });

    // Attach edit events
    document.querySelectorAll(".edit-btn").forEach(button => {
      button.addEventListener("click", function() {
        const index = this.getAttribute("data-index");
        startEdit(index);
      });
    });
  }

  function deletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  }

  function startEdit(index) {
    editIndex = index;
    const post = posts[index];
    titleInput.value = post.title;
    contentInput.value = post.content;
    document.querySelector("button[type='submit']").textContent = "Update Post";
  }

  postForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const title = titleInput.value;
    const content = contentInput.value;

    if (editIndex === -1) {
      // New post
      const newPost = {
        title: title,
        content: content,
        date: new Date().toLocaleString()
      };
      posts.unshift(newPost);
    } else {
      // Update existing post
      posts[editIndex].title = title;
      posts[editIndex].content = content;
      posts[editIndex].date = new Date().toLocaleString();
      editIndex = -1;
      document.querySelector("button[type='submit']").textContent = "Publish Post";
    }

    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
    postForm.reset();
  });

  renderPosts();
});
