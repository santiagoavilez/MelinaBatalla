import type { APIRoute } from "astro";
import { db, eq, Lesson, LessonProgress } from "astro:db";

export const getLessons = async () => {
    const lessons = await db
        .select({ id: Lesson.id, name: Lesson.name, slug: Lesson.slug })
        .from(Lesson);
    return lessons;
};
export const GET: APIRoute = async ({  locals}) => {
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
            lessonscompleted: lessonscompleted,
            lessons: lessonsWithProgress,
            map: progressMap,
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

