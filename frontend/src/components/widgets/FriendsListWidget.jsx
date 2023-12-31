import { useDispatch, useSelector } from "react-redux";
import Friends from "../Friends";
import { setFriends } from "../../redux";
import { useEffect } from "react";
const FriendsListWidget = ({ userId }) => {
  const { user } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const mode = useSelector((state) => state.auth.mode);
  const dispatch = useDispatch();

  const getFriends = async () => {
    const response = await fetch(
      `https://postgrammserver.onrender.com/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data, append: true }));
  };
  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div
      className={`${
        user.friends.length === 0 && "hidden"
      } px-3 mb-4 lg:mb-8  rounded-lg ${
        mode ? "bg-[#3a3349]" : "bg-white"
      } border-[0.5px] 
      border-[#cccbcbb0] max-h-[50vh] overflow-y-auto`}
    >
      <p className="py-4 text-center">Friends</p>
      {user.friends.map((friend) => (
        <div
          className="w-full  border-b-[0.8px] 
          border-[#d2d1d1b0] mb-2 px-2 py-1 
          rounded-md transition duration-200 hover:bg-slate-300 "
          key={friend._id}
        >
          <Friends
            postUserId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        </div>
      ))}
    </div>
  );
};
export default FriendsListWidget;
