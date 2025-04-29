import Button from "~/compo/button";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import React from "react";
import AppInput from "~/compo/input";
import AnimatedLoading from "~/compo/AnimatedLoading";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vendesquare Admin" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  const token = "jjj";
  React.useEffect(() => {
    // console.log(token);

    // if (token){
    //   navigate("/dashboard")
    // }else{
    setTimeout(() => {
      navigate("/login");
    }, 2500);
    // }
  }, []);
  return (
    <div className="w-full h-screen grid place-items-center">
      <AnimatedLoading/>
    </div>
    // <div>
    //   <Button onClick={() => navigate("/dashboard")} textColor="white" fullWidth >go to dashboard</Button>
    //   <Button onClick={() => navigate("/login")}>go to login</Button>
    //   {/* <AppInput inputValue={"in"} placeholder="Name" passwordInput/> */}
    // </div>
  );
}
