import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState();
  const [registerMessage, setRegisterMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showEye, setShowEye] = useState(false);
  const [showEyeConf, setShowEyeConf] = useState(false);
  axios.defaults.withCredentials = true;

  const register = () => {
    const data = {
      username,
      password,
      passwordConf,
      email,
      address,
      phone,
      city,
      country,
      state,
      postalCode,
      houseNumber,
    };

    axios
      .post("user/register", data, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setRegisterMessage(res.data.message);
        redirect();
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };
  // i used useHistory to redirect after registering to the login page
  let history = useHistory();
  const redirect = () => {
    history.push("/login");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div onSubmit={handleSubmit} className="register-container">
      
    <div className="register-container">
      <h2>Registrierung</h2>
      <h3 style={{ color: "green" }}>{registerMessage}</h3>
      <h3 style={{ color: "red" }}>{errorMessage}</h3>
      <input
        type="text"
        value={username}
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Benutzername eingeben"
      />
      <input
        type="email"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-Mail eingeben"
      />
      <div className="password">
        <input
          type={showEye ? "text" : "password"}
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwort eingeben"
        />
        <span className="iconPass" onClick={() => setShowEye(!showEye)}>
          {" "}
          {showEye ? <HiOutlineEye /> : <HiOutlineEyeOff />}
        </span>
      </div>
      <div className="password">
        <input
          type={showEyeConf ? "text" : "password"}
          value={passwordConf}
          name="passwordConf"
          onChange={(e) => setPasswordConf(e.target.value)}
          placeholder="Passwort bestätigen"
        />
        <span className="iconPass" onClick={() => setShowEyeConf(!showEyeConf)}>
          {" "}
          {showEyeConf ? <HiOutlineEye /> : <HiOutlineEyeOff />}
        </span>
      </div>

      <input
        type="phone"
        value={phone}
        name="phone"
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefonnummer eingeben"
      />
      <input
        type="address"
        value={address}
        name="address"
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Straße eingeben"
      />
      <input
        type="houseNumber"
        value={houseNumber}
        name="houseNumber"
        onChange={(e) => setHouseNumber(e.target.value)}
        placeholder="Hausnummer eingeben"
      />
      <input
        type="country"
        value={country}
        name="country"
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Land eingeben"
      />
      <input
        type="state"
        value={state}
        name="state"
        onChange={(e) => setState(e.target.value)}
        placeholder="Bundesland eingeben"
      />
      <input
        type="city"
        value={city}
        name="city"
        onChange={(e) => setCity(e.target.value)}
        placeholder="Stadt eingeben"
      />

      <input
        type="postalCode"
        value={postalCode}
        name="postalCode"
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Postleitzahl eingeben"
      />

      <button className="button-dash" onClick={register}>
        Registrierung senden
      </button>

      <h4>oder</h4>
      <button className="button-dash">
        <Link to="/login">Anmelden</Link>
      </button>
    </div>
    </div>
  );
};
export default Register;
