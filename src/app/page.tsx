"use client";

import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/Loader';

export default function Home() {

  interface AdminData {
    email: string;
    password: string;
  }

  const router = useRouter();

  const [showPass, setshowPass] = useState(false);
  const [loader, setloader] = useState(false);

  const [logindata, setlogindata] = useState<AdminData>({
    email: '',
    password: ''
  })

  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloader(true);
    await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify(logindata),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
      .then(res => {
        // console.log(res);
        if (res.status === 200) {
          toast.success(res.message);
          localStorage.setItem('token', res.bearerToken);
          router.push("/dashboard");
          setloader(false);
        }
        else if (res.status === 401) {
          toast.error(res.message);
          setloader(false);
        }
        else if (res.status === 400) {
          toast.error(res.message);
          setloader(false);
        }
        else if (res.status === 500) {
          toast.error(res.message);
          setloader(false);
        }
      })
      .catch(err => {
        console.log(err);

      })
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <section>
        <div className="container mx-auto flex justify-center items-center">

          <div className="w-full md:w-3/5 lg:w-2/5 h-screen p-6 flex items-center">
            <div className="border border-gray-700 w-full rounded-2xl py-5" >

              <div className="login-form-part flex flex-col justify-center p-6 relative overflow-hidden">
                {
                  loader ? <Loader/> : null
                }
                <h1 className="mb-4 text-center">Welcome Back</h1>

                <form onSubmit={onLoginSubmit} >

                  <div className="mb-4 form-outer-div">
                    <label htmlFor="name" className="form-label ">Email address</label>
                    <input type="email" name="name" className="form-inp" placeholder="Email address"
                      onChange={(e) => setlogindata({ ...logindata, email: e.target.value })} value={'' || logindata.email} />
                  </div>

                  <div className="mb-4 form-outer-div">
                    <label htmlFor="password" className="form-label ">Password</label>

                    <div className='relative'>
                      <input type={showPass ? "text" : "password"} name='password' className="form-inp" placeholder='Password'
                        onChange={(e) => setlogindata({ ...logindata, password: e.target.value })} value={'' || logindata.password} />
                      <div className="password-show" onClick={() => setshowPass(!showPass)}>
                        {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </div>
                    </div>
                  </div>

                  <button className="btn-main">Submit</button>

                </form>
              </div>
            </div>
          </div>


        </div>
      </section>
    </>
  )
}
