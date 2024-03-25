import { getLessons } from "@components/root-program/LessonsList.astro";
import type { APIRoute } from "astro";
import { db, eq, LessonProgress } from "astro:db";


export const GET: APIRoute = async ({ locals }) => {
    try {
        const { userId } = locals
        const lessonscompleted = await db
            .select()
            .from(LessonProgress)
            .where(eq(LessonProgress.userId, userId as string));
        //  console.log("lessonscompleted", lessonscompleted);
        const lessons = await getLessons();

        const progressMap = new Map(lessonscompleted.map(lp => [lp.lessonId, lp]));

        // Agrega el campo isCompleted a las lecciones

        const lessonsWithProgress = lessons.map(lesson => ({
            ...lesson,
            isCompleted: progressMap.has(lesson.id)
        }));
        console.log("lessonsWithProgress", lessonsWithProgress);
        return new Response(JSON.stringify({
            lessons: lessonsWithProgress
        })
        )
    }
    catch (error) {
        // console.error('Error:', error);
        return new Response(JSON.stringify({
            error: error
        }), {
            status: 500,
            statusText: 'server error'
        });
    }
}
