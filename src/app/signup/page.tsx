import { BotIcon } from "lucide-react";
import { SignupForm } from "@/components/signup-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BotIcon className="size-4" />
            </div>
            Bot.AI
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:flex items-center justify-center bg-primary">
        <BotIcon className=" h-[50%] w-[50%] object-cover text-primary-foreground" />
      </div>
    </div>
  );
}
