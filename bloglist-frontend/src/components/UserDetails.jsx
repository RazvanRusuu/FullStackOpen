const UserDetails = ({ user, setUser }) => {
  return (
    <>
      <p>{user.name} is logged in</p>
      <button
        onClick={() => {
          localStorage.removeItem("blog_auth");
          setUser("");
        }}
      >
        Logout
      </button>
    </>
  );
};

export default UserDetails;
