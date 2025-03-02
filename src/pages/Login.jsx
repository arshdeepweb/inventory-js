import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Login Component
export function Login() {
  const {login, user} = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const onchangeHandle = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name == "" || formData.password == "") {
      return console.log("Fill Details");
    }

    const user = formData;
    login(user?.name)
    navigate("/dashboard");
  };

  useEffect(()=>{
    if(user){
      navigate('/dashboard')
    }
  }, [user])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            className="border p-2 w-full mb-4"
            type="text"
            placeholder="Name"
            onChange={onchangeHandle}
          />
          <input
            name="password"
            className="border p-2 w-full mb-4"
            type="password"
            placeholder="Password"
            onChange={onchangeHandle}
          />
          <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
