"use client";

import React, { useEffect, useState } from "react";

type Speaker = {
    id: string;
    name: string;
    description?: string;
};

const SpeakerComponent = () => {
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const res = await fetch("/api/speakers");
                const data = await res.json();
                setSpeakers(data);
            } catch (error) {
                console.error("Error loading speakers: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpeakers();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="
        w-full
        rounded-[28px]
        border border-[#132238]
        bg-[#07101D]
        p-8
        shadow-[0_0_40px_rgba(0,0,0,0.35)]
        ">
            <h2 className="text-lg font-bold mb-3">Speakers</h2>

            <ul className="space-y-3">
                {speakers.map((speaker) => (
                    <li key={speaker.id} className="p-2 border rounded">
                        <p className="font-medium">{speaker.name}</p>
                        {speaker.description && (
                            <p className="text-sm text-gray-500">
                                {speaker.description}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpeakerComponent;