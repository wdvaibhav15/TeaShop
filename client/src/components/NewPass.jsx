import React,{useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
    useLocation,
    useNavigate
} from "react-router-dom";

const NewPass = () => {

    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            const response = await axios.post(
                `${import.meta.env.VITE_CLIENT_API_URL}/api/auth/reset-password`,
                {
                    email,
                    password,
                    confirmPassword
                }
            );

            if(response.data.success){

                toast.success(
                    "Password Updated"
                );

                navigate(
                    "/password-reset-success"
                );
            }

        }catch(error){

            toast.error(
                error.response?.data?.message
            );
        }
    };

    return(

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e)=>
                    setPassword(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e)=>
                    setConfirmPassword(
                        e.target.value
                    )
                }
            />

            <button type="submit">
                Update Password
            </button>

        </form>
    );
};

export default NewPass;