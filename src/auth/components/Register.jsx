import React, { useState } from "react";
import { Button, Input, Form } from "@heroui/react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import { partialUser } from "../../user/user.schema";
import { RegisterService } from "../service/auth.service";
import Spinner from "../../global/components/Spinner";
export function Register() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const { register, handleSubmit } = useForm();
  // const [show, setShow] = useState(false);
  // const [message, setMessage] = useState({
  //   title: "",
  //   description: "",
  //   color: "",
  // });
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setIsLoading(true);
    const { username, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      // setMessage({
      //   title: "Both passwords must be the same ",
      //   description: "Check your passwords",
      //   color: "danger",
      // });
      // setShow(true);
      setIsLoading(false);
      return false;
    }
    const userObject = { username, email, password };

    const validUser = partialUser({ user: userObject });

    if (!validUser.success) {
      // setMessage({
      //   title: "Invalid username, password, or email.",
      //   description: "Check your info",
      //   color: "danger",
      // });
      // setShow(true);
      setIsLoading(false);
      return false;
    }
    const register = await RegisterService({ username, email, password });

    if (!register) {
      // setMessage({
      //   title: "Internal Server Error",
      //   description: "Try again",
      //   color: "danger",
      // });
      // setShow(true);
      setIsLoading(false);
      console.log("No se manda la peticion");
      return false;
    }

    // setMessage({
    //   title: "Register Success",
    //   description: "Please wait for login.",
    //   color: "success",
    // });
    // setShow(true);
    setTimeout(() => {
      navigate("/");
    }, 800);
    return true;
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="pb-4 text-left text-3xl font-semibold">
          Sign Up
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            isRequired
            label="Username"
            labelPlacement="outside"
            placeholder="Enter your username"
            type="text"
            variant="bordered"
            {...register("username")}
          />
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            {...register("email")}
          />
          <Input
            {...register("password")}
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeClosed className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <Eye className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <Input
            isRequired
            {...register("confirmPassword")}
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
                  <EyeClosed className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <Eye className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="Confirm your password"
            type={isConfirmVisible ? "text" : "password"}
            variant="bordered"
          />

          <Button
            color="secondary"
            type="submit"
            className="w-full"
            spinner={<Spinner />}
            isLoading={isLoading}
            // onPress={
            //   show ? (
            //     addToast({
            //       title: message.title,
            //       description: message.description,
            //     })
            //   ) : (
            //     <div className="hidden"></div>
            //   )
            // }
          >
            Sign Up
          </Button>
        </Form>
        <p className="text-center text-small text-secondary-400">
          <Link to="/" size="sm">
            Already have an account? Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
