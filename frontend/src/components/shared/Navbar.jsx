import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Briefcase } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to logout.");
        }
    }

    return (
        <nav className='pastel-navbar sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                {/* Logo */}
                <Link to="/">
                    <div className='flex items-center gap-2 group'>
                        <div className='w-9 h-9 rounded-xl bg-[#5d53c4] flex items-center justify-center shadow-md shadow-purple-500/10 transition-transform group-hover:scale-105'>
                            <Briefcase className='w-4.5 h-4.5 text-white' />
                        </div>
                        <h1 className='text-lg font-bold tracking-tight text-[#1a1a24]'>
                            Job<span className='text-[#5d53c4]'>Portal</span>
                        </h1>
                    </div>
                </Link>

                {/* Nav Links + Actions */}
                <div className='flex items-center gap-6'>
                    <ul className='flex font-semibold items-center gap-6 text-sm text-[#5e6475]'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/admin/companies" className='hover:text-[#5d53c4] transition-colors'>
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs" className='hover:text-[#5d53c4] transition-colors'>
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className='hover:text-[#5d53c4] transition-colors'>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className='hover:text-[#5d53c4] transition-colors'>
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse" className='hover:text-[#5d53c4] transition-colors'>
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login">
                                <Button variant="ghost" className='btn-pastel-outline py-2 h-auto text-xs px-4'>
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className='btn-pastel-primary py-2 h-auto text-xs px-4'>
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className='relative group focus:outline-none'>
                                    <div className='w-9 h-9 rounded-full p-0.5 bg-[#f1efff] border border-[#e0dbff] transition-transform group-hover:scale-105'>
                                        <Avatar className="h-full w-full">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                        </Avatar>
                                    </div>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 pastel-card border-[#ebedf5] p-4 mt-2">
                                <div className='flex gap-3 items-center mb-4 pb-4 border-b border-[#ebedf5]'>
                                    <div className='w-11 h-11 rounded-full p-0.5 bg-[#f1efff] border border-[#e0dbff] flex-shrink-0'>
                                        <Avatar className="h-full w-full">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                        </Avatar>
                                    </div>
                                    <div className='min-w-0'>
                                        <h4 className='font-bold text-[#1a1a24] text-sm truncate'>{user?.fullname}</h4>
                                        <p className='text-xs text-[#5e6475] truncate'>{user?.profile?.bio || 'No bio added'}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    {user && user.role === 'student' && (
                                        <Link to="/profile">
                                            <button className='flex w-full items-center gap-2.5 px-2.5 py-2 rounded-xl text-[#5e6475] hover:text-[#5d53c4] hover:bg-[#f1efff] transition-all text-xs font-semibold'>
                                                <User2 className='w-4 h-4' />
                                                View Profile
                                            </button>
                                        </Link>
                                    )}
                                    <button
                                        onClick={logoutHandler}
                                        className='flex w-full items-center gap-2.5 px-2.5 py-2 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-all text-xs font-semibold'
                                    >
                                        <LogOut className='w-4 h-4' />
                                        Logout
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar