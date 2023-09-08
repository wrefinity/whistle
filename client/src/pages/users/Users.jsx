import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "../home/home.css"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import UsersList from "../../components/usersComponent/UsersList";

export default function Users() {
  const { user } = useContext(AuthContext)
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <UsersList />
        <Rightbar user={user} />
      </div>
    </>
  );
}
