import { useEffect, useState } from "react";
import { fetchUserProfile } from "../utils/auth";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUserProfile();
      if (userData) {
        setUser(userData);
      } else {
        setError("Failed to fetch user data. Please login again.");
      }
    };

    getUserData();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>User Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
