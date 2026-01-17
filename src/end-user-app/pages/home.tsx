import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/user/login");
  }, []);
  return null;
};

export default UserHome;
