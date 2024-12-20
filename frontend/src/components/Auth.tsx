import { ChangeEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SignupType } from "@aditya6112/zod-validation";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setpostInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: "",
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            alert("Error ! While signing up!!")
            //alert the user here that request failed
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">Create an account</div>
                        <div className="text-slate-500 flex justify-center">
                            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                            <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
                                {type === "signin" ? "Sign Up" : "Sign In"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-3">
                        {type === "signup" ? <LabelledInput
                            label="Name"
                            placeholder="Enter your name"
                            onChange={(e) => {
                                setpostInputs({
                                    ...postInputs,
                                    name: e.target.value,
                                });
                            }}
                        /> : null}
                        <LabelledInput
                            label="Email"
                            placeholder="Enter your email"
                            onChange={(e) => {
                                setpostInputs({
                                    ...postInputs,
                                    email: e.target.value,
                                });
                            }}
                        />
                        <LabelledInput
                            label="Password"
                            type={"password"}
                            placeholder="Enter your password"
                            onChange={(e) => {
                                setpostInputs({
                                    ...postInputs,
                                    password: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="pt-5">
                        <button
                            onClick={sendRequest}
                            type="button"
                            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
               focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            {type === "signup" ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
function LabelledInput({
    label,
    placeholder,
    onChange,
    type,
}: LabelledInputType) {
    return (
        <div>
            <div>
                <label className="block mb-2 text-sm font-semibold text-black pt-2">
                    {label}
                </label>
                <input
                    onChange={onChange}
                    type={type || "text"}
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5 "
                    placeholder={placeholder}
                    required
                />
            </div>
        </div>
    );
}
