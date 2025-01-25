import { SignupForm } from "@/components/signup-form";
 
export default function Page() {
  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-40">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}