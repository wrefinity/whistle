import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosBase";
import { PermMedia } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext)
  const [file, setFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const username = useParams().username;

  const submitHandler = async (e) => {
    e.preventDefault();
    const {password, ...newProfileImage} = user;
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newProfileImage.profilePicture = fileName;
      try {
        await axiosInstance.post("/api/upload", data);
      } catch (err) {}
      try {
        await axiosInstance.put("/api/users/"+currentUser?._id, newProfileImage);
        window.location.reload();
      } catch (err) {}
    }
  };

  const coverHandler = async (e) => {
    e.preventDefault();
    const {password, ...newCoverPhoto} = user
    if (coverFile) {
      const data = new FormData();
      const fileName = Date.now() + coverFile.name;
      data.append("name", fileName);
      data.append("file", coverFile);
      newCoverPhoto.coverPicture = fileName;
      try {
        await axiosInstance.post("/api/upload", data);
      } catch (err) {}
      try {
        await axiosInstance.put("/api/users/"+currentUser?._id, newCoverPhoto);
        window.location.reload();
      } catch (err) {}
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/api/users?username=${currentUser?.username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  console.log(user)

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? `${PF}/${user?.coverPicture}`
                    : PF +"/person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? `${PF}/${user.profilePicture}`
                    : PF + "/person/noAvatar.png"
                }
                alt=""
              />
              {username === currentUser.username && (
                <>
              <form className="shareBottom p" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="orange" className="shareIcon" />
              <span className="shareOptionText">select profile photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className="shareButton" type="submit">
            Upload profile
          </button>
              </form>
              
              <form className="shareBottom p" onSubmit={coverHandler}>
          <div className="shareOptions">
            <label htmlFor="coverFile" className="shareOption">
              <PermMedia htmlColor="orange" className="shareIcon" />
              <span className="shareOptionText">select cover photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="coverFile"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setCoverFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className="shareButton" type="submit">
            Upload cover
          </button>
                  </form>
                  </>
              )}              
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
