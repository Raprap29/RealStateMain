"use client";

import { useState, useEffect } from "react";

export default function useOrigin(){
    const [currentUrl, setCurrentUrl] = useState<string>("");

    useEffect(() => {
        if (process) {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const currentUrlHost = currentUrl.split("/");

    return currentUrlHost[2];
}