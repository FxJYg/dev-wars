import { LoginForm } from "@/components/login-form";

export default function Page() {

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-40">
      <div className="flex fixed inset-0 z-50 min-h-svh w-full items-center justify-center p-6 md:p-10">
        <LoginForm />
      </div>
    </div> 
  )
}