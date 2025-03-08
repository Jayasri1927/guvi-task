export const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.log("No token found, please login first");
      return null;
    }
  
    try {
      const response = await fetch("http://localhost:5000/user/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        console.error("Error:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      return null;
    }
  };
  