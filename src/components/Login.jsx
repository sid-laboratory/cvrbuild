import { useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormActions";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const Navigate = useNavigate();

  const [user, setuser] = useState(fieldsState);
  const { storeToken } = useAuth();
  const handleChange = (e) => {
    setuser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1212/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();
      console.log("From front end login", responseData);

      if (response.ok) {
        console.log("Login successful");
        setuser({
          email: "",
          password: "",
        });
        storeToken(responseData.token);
        window.location.href = "/home";
        toast.success("login successful");
      } else {
        toast.error(responseData.extraDetails);
        console.log("login failed");
      }
    } catch (error) {
      toast.error(responseData.extraDetails);
      console.log("login", error);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={user[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
