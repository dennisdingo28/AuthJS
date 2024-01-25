"use client"

import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useCallback, useEffect } from "react";


export const NewVerificationForm = () =>{
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(()=>{
        console.log(token);
    },[]);

    useEffect(()=>{
        onSubmit();
    },[onSubmit]);

    return (
        <CardWrapper headerLabel="Confirming your verification" backButtonHref="/auth/login" backButtonLabel="Back to login">
            <div className="flex items-center w-full justify-center">
                <BeatLoader/>
            </div>
        </CardWrapper>
    )
}