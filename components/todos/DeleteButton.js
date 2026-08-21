"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";

export default function DeleteButton({id, todoTitle, className, redirectTo = "", label = "Delete"}){
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmed = confirm(`Are you sure you want to delete "${todoTitle}"?`)
        if(!confirmed) return;

        try{
            const response = await fetch(`/api/todos/${id}`,{
                method: "DELETE",
            });

            if(!response.ok){
                throw new Error("Failed to delete todo");
            }

            router.refresh();

            if(redirectTo){
                router.push(redirectTo);
            }
        }catch(error){
            alert(error.message || "Something went wrong while deleting");
        }finally{
            setIsDeleting(false);
        }
    };

    return(
        <button
        className={className}
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label={`Delete ${todoTitle}`}
        >
            {isDeleting ? "Deleting..": label}
        </button>
    )
}
