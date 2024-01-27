"use client"

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const AdminPage = () =>{
    
    const onServerActionClick = () =>{
        admin().then(data=>{
            if(data.error) toast.error(data.error);
            else toast.success(data.success);
        })
    }
    const onApiRouteClick = () =>{
        fetch("/api/admin").then(response=>{
            if(response.ok) toast.success("Allowed API Route!");
            else toast.error("Foridden API Route!");
        });
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">Admin</p>
            </CardHeader>    
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="This is the content for admins"/>
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-md">
                    <p className="text-sm font-medium">Admin only api route</p>
                    <Button onClick={onApiRouteClick}>Click to test</Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-md">
                    <p className="text-sm font-medium">Admin only server action</p>
                    <Button onClick={onServerActionClick}>Click to test</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminPage;