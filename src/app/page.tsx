import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div>
        <Button>
          I am button
        </Button>
      </div>
      <div>
        <Input placeholder="I am input" />
      </div>
      <div>
        <Input placeholder="I am input" />
      </div>
    </div>
  );
}
