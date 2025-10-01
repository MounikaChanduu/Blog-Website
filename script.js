 // Load posts dynamically from JSON
fetch("posts.json")
  .then(response => response.json())
  .then(data => {
    const blogContainer = document.getElementById("blogPosts");
    data.forEach(post => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p><small>${post.date}</small></p>
        <p>${post.content}</p>
      `;
      blogContainer.appendChild(postElement);
    });
  })
  .catch(error => console.error("Error loading posts:", error));

