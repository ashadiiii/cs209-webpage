// Event listener for form submission
document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('post-form');
    const postTitleInput = document.getElementById('post-title');
    const postDescriptionInput = document.getElementById('post-description');
    const postsContainer = document.getElementById('posts');

    let posts = []; // Array to hold posts
    let editIndex = null; // To track if we are editing a post

    // Create a new post
    function createPost(title, description, votes) {
        const post = {
            title: title,
            description: description,
            votes: votes,
        };
        posts.push(post);
        return post;
    }

    // Display posts
    function displayPosts() {
        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const postContent = document.createElement('div');
            postContent.classList.add('post-content');

            const postTitle = document.createElement('h3');
            postTitle.classList.add('post-title');
            postTitle.innerText = post.title;

            const postDescription = document.createElement('p');
            postDescription.classList.add('post-description');
            postDescription.innerText = post.description;

            const voteCount = document.createElement('span');
            voteCount.classList.add('vote-count');
            voteCount.innerText = post.votes;

            const upvoteButton = document.createElement('button');
            upvoteButton.classList.add('vote-btn', 'upvote');
            upvoteButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
            upvoteButton.onclick = () => {
                post.votes++;
                voteCount.innerText = post.votes;
            };

            const downvoteButton = document.createElement('button');
            downvoteButton.classList.add('vote-btn', 'downvote');
            downvoteButton.innerHTML = '<i class="fas fa-arrow-down"></i>';
            downvoteButton.onclick = () => {
                post.votes--;
                voteCount.innerText = post.votes;
            };

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.innerHTML = '<i class="fas fa-pencil"></i>'; // Unrelated symbol for delete
            deleteButton.onclick = () => {
                posts.splice(index, 1);
                displayPosts();
            };

            const editButton = document.createElement('button');
            editButton.classList.add('edit-btn');
            editButton.innerHTML = '<i class="fas fa-trash"></i>'; // Unrelated symbol for edit
            editButton.onclick = () => {
                editIndex = index;
                postTitleInput.value = post.title;
                postDescriptionInput.value = post.description;
            };

            postContent.appendChild(postTitle);
            postContent.appendChild(postDescription);
            postElement.appendChild(upvoteButton);
            postElement.appendChild(downvoteButton);
            postElement.appendChild(voteCount);
            postElement.appendChild(editButton);
            postElement.appendChild(deleteButton);
            postElement.appendChild(postContent);

            postsContainer.appendChild(postElement);
        });
    }

    // Handle form submission
    postForm.onsubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        const title = postTitleInput.value;
        const description = postDescriptionInput.value;
        const votes = Math.floor(Math.random() * 100); // Random vote count

        if (editIndex !== null) {
            posts[editIndex] = { title, description, votes }; // Edit existing post
            editIndex = null; // Reset edit index
        } else {
            createPost(title, description, votes); // Create new post
        }

        postTitleInput.value = '';
        postDescriptionInput.value = '';
        displayPosts(); // Update posts display
    };
});
