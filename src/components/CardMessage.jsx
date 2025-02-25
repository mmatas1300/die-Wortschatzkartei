"use client"
import { useEffect, useState } from "react";

const CardMessage = ({ message }) => {

    const [rotation, setRotation] = useState({ rotate20: "", rotate5: "", rotate10: "" });

    useEffect(() => {
        const setAnimation = () => {
            setRotation({ rotate20: "rotate-20", rotate5: "-rotate-5", rotate10: "-rotate-10" })
        }

        setTimeout(() => {
            setAnimation();
        }, 200)

    }, []);

    return (
        <div className="mt-[calc(25vh)] mb-10 w-44 lg:w-[300px]">
            <div className={`bg-orange-card ${rotation.rotate20} rounded-2xl transition-all`}>
                <div className={`bg-green-card ${rotation.rotate5} rounded-2xl transition-all`}>
                    <div className={`bg-blue-card ${rotation.rotate5} rounded-2xl transition-all`}>
                        <div className={`bg-red-card px-4 py-16 rounded-2xl ${rotation.rotate10} transition-all`}>
                            <div className="text-base text-center">{message}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CardMessage;