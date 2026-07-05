import React, { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from './ui/dialog'
import { Loader2, User, Mail, Phone, FileText, Code2, UploadCloud, FileSymlink, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: user?.profile?.resume || ""
    });
    const [fileName, setFileName] = useState("");
    
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const formRef = useRef(null);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, file });
            setFileName(file.name);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file && typeof input.file === 'object') {
            formData.append("file", input.file);
        }
        
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    // GSAP animation on open
    useGSAP(() => {
        if (open && formRef.current) {
            gsap.fromTo(formRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: 'power2.out', delay: 0.1 }
            );
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] p-0 border-border bg-card shadow-2xl rounded-2xl overflow-hidden gap-0">
                
                {/* Header */}
                <div className='bg-muted/40 p-6 border-b border-border'>
                    <DialogHeader>
                        <div className='flex items-center justify-between'>
                            <div>
                                <DialogTitle className="text-xl font-extrabold text-foreground tracking-tight">Edit Profile</DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground mt-1">
                                    Update your personal information and resume.
                                </DialogDescription>
                            </div>
                            <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                                <User className='w-5 h-5 text-primary' />
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                {/* Form */}
                <form onSubmit={submitHandler} className='p-6' ref={formRef}>
                    <div className='space-y-4'>
                        
                        {/* Name & Phone */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='space-y-1.5' style={{ opacity: 0 }}>
                                <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>Full Name</label>
                                <div className='relative'>
                                    <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                    <input
                                        type='text'
                                        name='fullname'
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        className='input-premium pl-9 text-sm'
                                        required
                                    />
                                </div>
                            </div>
                            <div className='space-y-1.5' style={{ opacity: 0 }}>
                                <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>Phone Number</label>
                                <div className='relative'>
                                    <Phone className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                    <input
                                        type='text'
                                        name='phoneNumber'
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        className='input-premium pl-9 text-sm'
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className='space-y-1.5' style={{ opacity: 0 }}>
                            <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>Email</label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                <input
                                    type='email'
                                    name='email'
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className='input-premium pl-9 text-sm'
                                    required
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className='space-y-1.5' style={{ opacity: 0 }}>
                            <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>Bio</label>
                            <div className='relative'>
                                <FileText className='absolute left-3 top-3 w-4 h-4 text-muted-foreground' />
                                <textarea
                                    name='bio'
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className='input-premium pl-9 text-sm py-2 min-h-[80px] resize-y'
                                    placeholder='Tell us about yourself...'
                                />
                            </div>
                        </div>

                        {/* Skills */}
                        <div className='space-y-1.5' style={{ opacity: 0 }}>
                            <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>Skills <span className='text-muted-foreground normal-case font-medium lowercase'>(comma separated)</span></label>
                            <div className='relative'>
                                <Code2 className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                <input
                                    type='text'
                                    name='skills'
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className='input-premium pl-9 text-sm'
                                    placeholder='React, Node.js, GSAP...'
                                />
                            </div>
                        </div>

                        {/* Resume */}
                        <div className='space-y-1.5 pt-1' style={{ opacity: 0 }}>
                            <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>Resume</label>
                            
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className='flex items-center justify-between p-3 border-2 border-dashed border-border rounded-xl bg-card hover:bg-muted transition-colors cursor-pointer group'
                            >
                                <div className='flex items-center gap-3 min-w-0'>
                                    <div className='w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-950/20 flex items-center justify-center flex-shrink-0'>
                                        <UploadCloud className='w-4 h-4 text-orange-500' />
                                    </div>
                                    <div className='min-w-0'>
                                        <p className='text-sm font-semibold text-foreground truncate'>
                                            {fileName || 'Upload new resume'}
                                        </p>
                                        <p className='text-xs text-muted-foreground'>PDF up to 5MB</p>
                                    </div>
                                </div>
                                <span className='btn-secondary text-xs h-8 px-3 rounded-lg pointer-events-none'>Browse</span>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="hidden"
                            />

                            {/* Active Resume Indicator */}
                            {user?.profile?.resume && !fileName && (
                                <div className='flex items-center gap-2 mt-2 px-1'>
                                    <FileSymlink className='w-3.5 h-3.5 text-primary' />
                                    <p className='text-xs text-muted-foreground truncate'>
                                        Current: <a href={user.profile.resume} target="_blank" rel="noopener noreferrer" className='text-primary font-medium hover:underline' onClick={e => e.stopPropagation()}>{user.profile.resumeOriginalName || 'Document'}</a>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className='flex items-center gap-3 pt-5 border-t border-border mt-6' style={{ opacity: 0 }}>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className='btn-secondary flex-1 py-2.5 text-sm rounded-xl'
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className='btn-primary flex-1 flex items-center justify-center gap-2 py-2.5 text-sm rounded-xl'
                            >
                                {loading ? <><Loader2 className='w-4 h-4 animate-spin' /> Saving...</> : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Custom close button */}
                <DialogClose className='absolute top-6 right-6 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted-foreground hover:text-background transition-colors'>
                    <X className='w-4 h-4' />
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog