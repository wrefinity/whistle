import "./user.css";
import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../axiosBase";

export default function User({ User }) {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/api/users?userId=${User?._id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [User?._id]);

  const handleFollow = () => {
    try {
      axiosInstance.put("/api/users/" + User?._id + "/follow", { userId: currentUser?._id });
      window.location.reload()
    } catch (err) { }
  };

  const handleUnfollow = () => {
    try {
      axiosInstance.put("/api/users/" + User?._id + "/unfollow", { userId: currentUser?._id });
      window.location.reload()
    } catch (err) { }
  };

  const following = User?.followers?.filter(f => f === currentUser._id).length
    
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user?.username}`}>
              <img
                className="postProfileImg"
                src={
                  user?.profilePicture
                    ? `${PF}/${user?.profilePicture}`
                    : PF + "/person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user?.username}</span>
          </div>
          {following===0 &&(<div className="postTopRight">
            <button className="follow-button" onClick={handleFollow}>Follow</button>
          </div>)}
          {following>0 && (<div className="postTopRight">
            <button className="unfollow-button " onClick={handleUnfollow}>Unfollow</button>
          </div>)}
        </div>
        <div className="postCenter">
          <span className="postText">{User?.desc}</span>
          <img className="postImg" src={`${PF}/${User?.img}`} alt="" />
        </div>
      </div>
    </div>
  );
}
