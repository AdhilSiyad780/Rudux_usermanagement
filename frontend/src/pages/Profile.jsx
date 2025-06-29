import { useEffect, useState } from "react";
import api from "../features/auth/authAPI";

export default function Profile() {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);

  const getProfile = async () => {
    try {
      const res = await api.get("profile/");
      console.log("this is get profile data", res);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      await api.put("profile/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      getProfile();
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome, {data.username}</h2>

      <p><strong>Username:</strong> {data.username}</p>
      <p><strong>Email:</strong> {data.email}</p>

      {data.profile_image && (
        <img
          src={`http://127.0.0.1:8000${data.profile_image}`}
          alt="Profile"
          style={styles.image}
        />
      )}
      {data.profile_image?'':
       <form onSubmit={updateProfile} style={styles.form}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Set Profile</button>
      </form>

      }

     
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  input: {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "0.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
