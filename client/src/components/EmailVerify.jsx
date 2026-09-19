import React,{useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail,ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {

    const [email,setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            const response = await axios.post(
                `${import.meta.env.VITE_CLIENT_API_URL}/api/auth/forgot-password`,
                { email }
            );

            if(response.data.success){

                toast.success("OTP Sent");

                navigate("/verify-otp",{
                    state:{email}
                });
            }

        }catch(error){

            toast.error(
                error.response?.data?.message
            );
        }
    };

    return(
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>

                <label>Email</label>

                <div className="relative">

                    <Mail className="absolute left-3 top-3"/>

                    <input
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                        className="w-full pl-10"
                    />

                </div>

            </div>

            <button type="submit">
                Send OTP
                <ArrowRight />
            </button>

        </form>
    );
};

export default EmailVerify;