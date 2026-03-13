import { assets } from '@/Assets/assets'
import axios from 'axios';
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation' // Added for redirect

const Header = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [adminData, setAdminData] = useState({ username: "", password: "" });
  const router = useRouter(); // Added for redirect

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post('/api/email', formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error")
    }
  }

   const handleAdminLogin = async (e) => {
    e.preventDefault();
    router.push('/admin');
    };

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <div>
          <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto'/>
        </div>
        <div className='flex justify-between items-center gap-4'>
          <button
            className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'
            onClick={() => setShowModal(true)}>
            Admin log in <Image src={assets.arrow} alt='ImgError'/>
          </button>
        </div>
      </div>
      {/* Admin Login Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded shadow-lg min-w-[300px]">
            <h2 className="text-xl mb-4 font-bold">Admin Login</h2>
            <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
              <div className="flex gap-2">
                <button type="submit" className="bg-black text-white px-4 py-2 rounded">Login</button>
                <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#10BF00]' action="">
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' className='pl-4 outline-none' required />
          <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Header