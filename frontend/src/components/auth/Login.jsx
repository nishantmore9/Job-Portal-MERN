import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const {loading} = useSelector(store => store.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post("/api/v1/user/login", input , {
        headers : {
          "Content-Type" : "application/json"
        }
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
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
        <h1 className="font-bold text-xl mb-5">Log In</h1>
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
        </div>
        {
          loading ? <Button className="w-full my-2"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>please wait</Button> : <Button className="w-full my-2">Login</Button>
        }
        <span className="text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
