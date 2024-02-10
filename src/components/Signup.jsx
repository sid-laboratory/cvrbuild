import { useState } from "react";
import { signupFields } from "../constants/formFields";
import FormAction from "./FormActions";
import Input from "./Input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const navigate = useNavigate();
  const [user, setuser] = useState(fieldsState);

  const handleChange = (e) =>
    setuser({ ...user, [e.target.id]: e.target.value });
  const { storeToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1212/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // Ensure user object has correct fields
      });
      console.log("from signup", response);
      const responseData = await response.json();
      if (response.ok) {
        console.log("Registration successful");
        setuser({
          name: "",
          email: "",
          password: "",
        });
        // console.log(response);
        storeToken(responseData.token);

        window.location.href = "/";
        toast.success("Registration successful");
      } else {
        toast.error(responseData.extraDetails);
      }
    } catch (error) {
      console.log("register", error);
      toast.error(responseData.extraDetails);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
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
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
