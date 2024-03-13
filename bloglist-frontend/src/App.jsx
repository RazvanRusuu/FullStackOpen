import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/Login";
import loginService from "./services/login";

import UserDetails from "./components/UserDetails";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Toggble";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState("");
  const [user, setUser] = useState("");

  const handleNotification = (content) => {
    setNotification(content);
    setTimeout(() => {
      setNotification({});
    }, 3000);
  };

  const newBlogRef = useRef();

  const handleSubmit = async (username, password) => {
    try {
      const response = await loginService.login({ username, password });
      setUser(response.data);
      localStorage.setItem("blog_auth", JSON.stringify(response.data));
    } catch (error) {
      handleNotification({
        message: error.data.message,
        type: "error",
      });
    }
  };

  const handleBlogSubmit = async (body) => {
    try {
      const { data } = await blogService.createBlog(body);
      handleNotification({
        message: `A new blog added ${data.title} by ${data.author}`,
        type: "success",
      });
      setBlogs((prev) => [...prev, data]);
      newBlogRef.current.toggleVisibility();
    } catch (error) {
      handleNotification({ message: error.response.data.error, type: "error" });
    }
  };

  const handleDelete = (deletedBlog) => {
    const updatedBlogs = blogs.filter(
      (currBlog) => currBlog.id !== deletedBlog.id
    );

    setBlogs(updatedBlogs);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const user = JSON.parse(localStorage.getItem("blog_auth"));
    if (user) {
      setUser(user);
    }
  }, []);

  const sortedBlogsByLikes = blogs.toSorted((a, b) => a.likes - b.likes);

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />

      {!user && <LoginForm onSubmit={handleSubmit} />}
      {user && (
        <>
          <h2>blogs</h2>
          <UserDetails user={user} setUser={setUser} />
          <Togglable ref={newBlogRef} buttonLabel="New Blog">
            <BlogForm handleBlogSubmit={handleBlogSubmit} />
          </Togglable>

          {sortedBlogsByLikes.map((blog) => (
            <Blog onDelete={handleDelete} key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
