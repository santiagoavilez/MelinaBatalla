import { auth } from "@lib/authStore";
import { persistentCompletedLessons } from "@lib/bonusStore";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";

export default function useFetchCompletedLessons () {
    const clerk = useStore(auth);
    const user = clerk?.user;
    const persistCompleted = useStore(persistentCompletedLessons);

    useEffect(() => {
        if (persistCompleted === null) {
            if (!user?.id) return;
            fetch('/api/lessons/lessonscompleted', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user.id })
            }).then(res => res.json()).then(data => {
                console.log('data.lessons', data.lessons);
                persistentCompletedLessons.set(data.lessons);
            });
        }
    }, [user?.id, persistCompleted?.length]);
}