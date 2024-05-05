"use client"
import { useEffect, useState } from "react";

const UbenMessages = ({ message }) => {

    const [rotation, setRotation] = useState({ rotate35: "", rotate5: "", rotate10: "" });

    useEffect(() => {
        const setAnimation = () => {
            setRotation({ rotate35: "rotate-35", rotate5: "-rotate-5", rotate10: "-rotate-10" })
        }

        setTimeout(() => {
            setAnimation();
        }, 200)

    }, []);

    return (
        <div className="mt-[calc(25vh)]">
            <div className={`bg-yellow-card ${rotation.rotate35} rounded-2xl transition-all`}>
                <div className={`bg-orange-card ${rotation.rotate5} rounded-2xl transition-all`}>
                    <div className={`bg-green-card ${rotation.rotate10} rounded-2xl transition-all`}>
                        <div className={`bg-blue-card ${rotation.rotate10} rounded-2xl transition-all`}>
                            <div className={`bg-red-card px-4 py-16 rounded-2xl ${rotation.rotate10} transition-all`}>
                                <div className="text-base">{message}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UbenMessages;