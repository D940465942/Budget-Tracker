import React, { use, useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout'
import Input from '../../components/Inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
  e.preventDefault();

  let profileImageUrl = "";

  if (!fullName) {
    setError("Please enter your name");
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email address");
    return;
  }

  if (!password) {
    setError("Please enter your password");
    return;
  }

  setError(null);

  try {
   const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/v1/auth/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  fullName,
  email,
  password,
}),
});


    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Signup failed");
      return;
    }

    console.log("Signup success:", data);
    // Optionally redirect
    navigate("/login");
  } catch (err) {
    console.error("Signup error:", err);
    setError("Something went wrong. Please try again.");
  }
};


  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full flex flex-col justify-center">
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              type="text"
              placeholder="Full Name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              type="email"
              placeholder="student@example.com"
            />
            <div className='col-span-2'>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                placeholder="Min 8 Characters"
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            SIGN UP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{" "}
            <Link className='font-medium text-primary underline' to="/login">
              Login
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp