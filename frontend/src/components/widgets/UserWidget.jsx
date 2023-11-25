import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
const UserWidget = () => {
  const [userData, setUserData] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:5173/users/${userId}`);
  };

  return (
    <div
      className={`${
        mode ? "bg-slate-700" : " bg-slate-200 border-[1px] border-slate-400"
      }rounded-xl p-5`}
    >
      <div className="flex flex-row items-center gap-2 py-2">
        <div className="w-[50px] h-[40px] ">
          <img
            className="object-cover rounded-full"
            src={`http://localhost:3001/assets/${picturePath}`}
            alt="user-photo"
          />
        </div>
        <div className="flex items-center">
          <div className="mx-2">
            <p className="w-full">{`${firstName} ${lastName}`}</p>
            <span>{friends.length} friends</span>
          </div>
          <button className=" px-1 ml-8 hover:bg-slate-400">
            {user && (
              <PersonAddIcon sx={{ fontSize: "15px", color: "green" }} />
            )}
          </button>
        </div>
      </div>
      <hr className="m-3" />
      <div>
        <span className="flex mt-3 gap-2">
          <LocationOnIcon sx={{ color: "red" }} />
          <p>{location}</p>
        </span>
        <span className="flex mt-3 gap-2">
          <WorkIcon sx={{ color: "purple" }} />
          <p>{occupation}</p>
        </span>
      </div>
      <hr className="m-3" />
      <div>
        <div className="flex justify-between ">
          <p>the number of views</p>
          <p>{viewedProfile}</p>
        </div>
        <div className="flex justify-between ">
          <p>the number of likes</p>
          <p>{impressions}</p>
        </div>
      </div>
      <hr className="m-3" />
      <div>
        <p> Social Profiles:</p>
        <div>
          <div className="flex items-center">
            <InstagramIcon sx={{ fontSize: "35px" }} />
            <div className="mx-3 flex flex-col">
              <p className="uppercase my-2 ">Instagram</p>
              <div className="flex relative">
                <input
                  id="socialNetwork"
                  name="socialNetwork"
                  className=" outline-none 
                bg-transparent 
                border-b text-white"
                  type="text"
                />
                <label
                  className="absolute text-blue-500 bottom-0 py-3 hover:text-blue-200 right-0"
                  htmlFor="socialNetwork"
                >
                  <EditIcon />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
