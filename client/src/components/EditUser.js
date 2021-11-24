import React, { useState, useContext } from "react";
import { DataContext } from "./UserContext";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
function EditUser({ history }) {
  //use the context
  const [data] = useContext(DataContext);
  const userData = data.user;
  //console.log(userData);
  const [token, setToken] = useContext(AuthContext);
  const config = {
    headers: {
      authorization: token,
    },
  };
  const [closeUser, setCloseUser] = useState(true);
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [passwordToD, setPasswordToD] = useState(null);
  const [passwordConf, setPasswordConf] = useState(null);
  const [NewPassword, setNewPassword] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const updateUserInfo = () => {
    const newData = {
      email,
      address,
      phone,
      houseNumber,
      city,
      state,
      country,
      postalCode,
    };

    //edit user infos
    axios
      .put("user/update", newData, config)
      .then((res) => {
        console.log(res.data);
        setUpdateMessage(res.data.message);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err?.response?.data.message);
      });
  };
  //
  const showEditUser = () => {
    setShow(!show);
    setCloseUser(!closeUser);
  };
  //change password
  const changePassword = () => {
    const newPassword = { passwordConf, NewPassword, password };
    const logoutAfterUpdate = () => {
      setTimeout(
        () =>
          setUpdateMessage(
            "your going to logout in 3s ,please login with the new password"
          ),
        3000
      );
      setTimeout(
        () => setToken(null) + localStorage.clear() + history.push("/login"),
        7500
      );
    };
    axios
      .put("user/updatePassword/", newPassword, config)
      .then((res) => {
        console.log(res.data);
        setUpdateMessage(res.data.message);
        logoutAfterUpdate();
      })
      .catch((error) => {
        console.log(error?.response?.data.message);
        setUpdateMessage(error.response.data.message);
      });
  };
  // delete user
  const deleteUser = () => {
    const logoutAfterDelete = () => {
      setTimeout(
        () => setUpdateMessage("you are not our client anymore 😔"),
        3000
      );
      setTimeout(
        () => setToken(null) + localStorage.clear() + history.push("/register"),
        7500
      );
    };
    const config = {
      headers: {
        authorization: token,
        pass: passwordToD,
      },
    };

    axios
      .delete("user/deleteUser", config)
      .then((res) => {
        logoutAfterDelete();
        setUpdateMessage(res.data.message);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data.message);
        setUpdateMessage(err?.response?.data.message);
      });
  };

  return (
    <div className="edit-user-container">
      <h1>Profile</h1>
      <div>
        <h3> User Information</h3>

        <p>{userData?.username}</p>
        <p>{userData?.email}</p>
        <p>{userData?.phone}</p>
        <p>
          {userData?.address} ,{userData?.houseNumber}
        </p>
        <p>{userData?.city}</p>
        <p> {userData?.state}</p>
        <p> {userData?.country}</p>
        <p> {userData?.postalCode}</p>
        <div className="editIcon" onClick={showEditUser}>
          <FaUserEdit />
        </div>
        <div className={show ? "edit-none" : "edit-show"}>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your email"
          />
          <input
            type="phone"
            value={phone}
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="enter your phone number"
          />
          <input
            type="address"
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="enter your address"
          />
          <input
            type="houseNumber"
            value={houseNumber}
            name="houseNumber"
            onChange={(e) => setHouseNumber(e.target.value)}
            placeholder="enter your House Number"
          />
          <input
            type="country"
            value={country}
            name="country"
            onChange={(e) => setCountry(e.target.value)}
            placeholder="enter your Country Name"
          />
          <input
            type="state"
            value={state}
            name="state"
            onChange={(e) => setState(e.target.value)}
            placeholder="enter your State Name"
          />
          <input
            type="city"
            value={city}
            name="city"
            onChange={(e) => setCity(e.target.value)}
            placeholder="enter your City Name"
          />
          <input
            type="postalCode"
            value={postalCode}
            name="postalCode"
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="enter your postal Code"
          />
        </div>
        <button onClick={updateUserInfo}>Update Your Profile</button>
      </div>
      <div>
        <h3> User Password</h3>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your current password"
        />
        <input
          type="password"
          value={NewPassword}
          name="NewPassword"
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="enter your new password"
        />
        <input
          type="password"
          value={passwordConf}
          name="passwordConf"
          onChange={(e) => setPasswordConf(e.target.value)}
          placeholder="confirm your password"
        />
        <button onClick={changePassword}>Change Your Password</button>
      </div>
      <div>
        <h3>Delete your account</h3>
        <input
          type="password"
          value={passwordToD}
          name="passwordToD"
          onChange={(e) => setPasswordToD(e.target.value)}
          placeholder="enter your password"
        />
        <button onClick={deleteUser}>DELETE ACCOUNT</button>
      </div>
      <h2 style={{ color: "green" }}>{updateMessage}</h2>
    </div>
  );
}

export default EditUser;
