import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const {loading} = useSelector(store => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(
        "/api/v1/user/register",
        formData,
        {
          headers : { 'Content-Type': "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="mx-auto max-w-6xl flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-gray-200 p-4 rounded-md my-20"
      >
        <h1 className="font-bold text-xl mb-5">Sign Up</h1>
        <div className="my-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            placeholder="Jon Doe"
            name="fullName"
            value={input.fullName}
            onChange={changeEventHandler}
          />
        </div>
        <div className="my-2 ">
          <Label>E-mail</Label>
          <Input
            type="email"
            placeholder="jon@email.com"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
          />
        </div>
        <div className="my-2">
          <Label>Phone Number</Label>
          <Input
            type="text"
            placeholder="1234567890"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
          />
        </div>
        <div className="my-2">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
          />
        </div>
        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-4 my-4 cursor-pointer">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                value="student"
                name="role"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
                id="r1"
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                value="recruiter"
                name="role"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
                id="r2"
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>
        </div>
        {
          loading ? <Button className="w-full my-2"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>please wait</Button> : <Button className="w-full my-2">Sign Up</Button>
        }
        <span className="text-sm">
          Already have an account?{""}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
