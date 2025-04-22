// @ts-check
import React, { useState } from "react";
import { Button, Input, Form } from "@heroui/react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import { useAuth } from "./auth/hooks/useAuth";
import Spinner from "./global/components/Spinner";
import { partialUser } from "./user/user.schema";
export default function App() {
  const { login } = useAuth();
  const [isVisible, setIsVisible] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const onSubmit = async (data) => {
    console.log({ data });
    setIsLoading(true);
    const { email, password } = data;
    const objectLogin = {
      email,
      password,
    };
    const valid = partialUser({ user: objectLogin });
    if (!valid.success) {
      console.error("Error");
      setIsLoading(false);
      return false;
    }
    const result = await login({ emailUser: email, password });

    if (!result) {
      console.error("Error");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      navigate("/todos");
    }, 800);
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="pb-4 text-left text-3xl font-semibold">
          Log In
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <Form
          className="flex flex-col gap-4"
          validationBehavior="native"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            isRequired
            {...register("password")}
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
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full items-center justify-end px-1 py-2">
            <Link className="text-default-500 " to={"/"}>
              Forgot password?
            </Link>
          </div>
          <Button
            className="w-full"
            color="secondary"
            type="submit"
            isLoading={isLoading}
            spinner={<Spinner />}
          >
            Log In
          </Button>
        </Form>
        <p className="text-center text-small text-secondary-400">
          <Link to={"/register"}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}
