import { useEffect, useState } from "react";
import userService from "../services/user.service";

const useProfile = () => {
  const anonymousUser = {
    nickname: "Anonymous",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLUQhSwRSYL-FK4fp3Rzjt5f9nP0eg8h6pA0RO_LO2ig&s",
    online: false,
  };

  const [online, setStatus] = useState(anonymousUser.online);
  const [nickname, setNickname] = useState("");
  const [profilePic, setProfilePic] = useState(anonymousUser.profilePic);

  const handleChangeNickname = (value: string) => {
    setNickname(value);
  };

  useEffect(() => {
    const listener: any = window.addEventListener("beforeunload", () =>
      userService.setUserStatus(false)
    );

    (async () => {
      const user = await userService.setUserStatus(true);
      setNickname(user.nickname ?? anonymousUser.nickname);
      setProfilePic(user.profilePic ?? anonymousUser.profilePic);
      setStatus(user.online ?? anonymousUser.online);
    })();

    return () => {
      window.removeEventListener("beforeunload", listener);
      userService.setUserStatus(false);
    };
  }, []);

  return { online, nickname, handleChangeNickname, profilePic };
};

export default useProfile;
