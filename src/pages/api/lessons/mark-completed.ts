import type { MarkCompletedProps } from "@components/lessons/MarkCompleted";
import type { APIRoute } from "astro"
import { db, LessonProgress } from "astro:db"

export const POST: APIRoute = async ({ request }) => {

    try {
        const body = await request.json();
        const { lessonId, lessonSlug,  userId } = body as MarkCompletedProps & { userId: string };
        const lesson = await db.insert(LessonProgress).values({ lessonId: lessonId, lessonSlug: lessonSlug , userId: userId, status: 'completado' }).returning()

        return new Response(JSON.stringify({
            lesson: lesson
        })
        )
    }
    catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({
            error: error
        }), {
            status: 500,
            statusText: 'server error'
        });
    }
}