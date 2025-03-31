import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/dashboard")}>go to dashboard</Button>
      <Button onClick={() => navigate("/login")}>go to login</Button>
    </div>
  );
}
