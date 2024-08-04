import {useSelector , useDispatch} from "react-redux";
import axios from "axios";


const port = import.meta.env.VITE_URI;

const login = ({email , password}) => {
    try {
      axios.post(`${port}/users/login`, { email, password },{withCredentials:true})
      .then(useDispatch((res) => login(res?.data?.message?.user)))
    } catch (error) {
      console.error("Login request failed:", error);
    }
};

const logout = async () => {
    try {
      const res = await axios.post(`${port}/users/logout`, {}, { withCredentials: true })
      .then(useDispatch(logout()));
      console.log('Logout successful:', res.data);
    } catch (error) {
      console.error("Logout request failed:", error);
    }
};

export {
    login , logout
}