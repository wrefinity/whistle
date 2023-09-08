import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import "../feed/feed.css"
import "./user.css"
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../axiosBase";
import User from "./User";

export default function UsersList({ username }) {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosInstance.get("/api/users/all" )
      setUsers(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }).filter(u => u._id !== user._id)
      );
    };
    fetchUsers();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <div className="label"><p>Users</p></div>
        {users.map((u) => (
          <User key={u?._id} User={u} />
        ))}
      </div>
    </div>
  );
}
