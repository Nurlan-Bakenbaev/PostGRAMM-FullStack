import {
  PersonAddAlt1Outlined,
  PersonRemoveAlt1Outlined,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../redux";
const Friends = ({ postUserId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth);
  const { friends } = useSelector((state) => state.auth.user);
  const isFriend = friends?.find((friend) => friend._id === postUserId);
  const pathProfile = location.pathname.includes(`/profile/${postUserId}`);

  const patchFriend = async () => {
    try {
      const response = await fetch(
        `https://postgrammserver.onrender.com/users/${user._id}/${postUserId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(` ${response.status} - ${response.statusText}`);
        return;
      }

      const data = await response.json();
      !pathProfile && dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className=" rounded-lg drop-shadow-lg flex 
     justify-between items-start min-w-[250px] mx-auto
      md:max-w-[550px] mb-3"
    >
      <div className="text-sm flex gap-3 items-center">
        <div className=" w-[55px] h-[55px]">
          {userPicturePath ? (
            <img
              className="border border-slate-400 duration-300
               hover:scale-110 
               w-full h-full object-cover rounded-full"
              src={`https://postgrammserver.onrender.com/assets/${userPicturePath}`}
              alt="User"
            />
          ) : (
            <AccountCircleIcon sx={{ fontSize: "25px" }} />
          )}
        </div>
        <div
          className="flex flex-col"
          onClick={() => {
            navigate(`/profile/${postUserId}`);
          }}
        >
          <p className="hover:text-blue-600 text-xs cursor-pointer border-b border-amber-500">
            {name}
          </p>
          <p className="text-slate-500 text-[12px]">{subtitle} </p>
        </div>
      </div>
      <div
        className="cursor-pointer hover:bg-indigo-400 p-1 rounded-full "
        onClick={() => patchFriend()}
      >
        <div
          className={
            (user._id === postUserId && "hidden") || (pathProfile && "hidden")
          }
        >
          {isFriend ? (
            <PersonRemoveAlt1Outlined sx={{ color: "red", fontSize: "25px" }} />
          ) : (
            <PersonAddAlt1Outlined sx={{ color: "green", fontSize: "25px" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
