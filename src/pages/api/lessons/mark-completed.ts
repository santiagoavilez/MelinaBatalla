import type { MarkCompletedProps } from "@components/lessons/MarkCompleted";
import type { APIRoute } from "astro"
import { and, db, eq, LessonProgress } from "astro:db"

export const POST: APIRoute = async ({ request }) => {

    try {
        const body = await request.json();
        const { lessonId, lessonSlug, userId } = body as MarkCompletedProps & { userId: string };
        const [existingEntry] = await db.select({ id: LessonProgress.id }).from(LessonProgress).
            where(and(eq(LessonProgress.userId, userId), eq(LessonProgress.lessonId, lessonId))).limit(1);

        if (!existingEntry) {
            // Si no existe una entrada, insertar la nueva entrada
            const lesson = await db.insert(LessonProgress).values({ lessonId: lessonId, lessonSlug: lessonSlug, userId: userId, status: 'completado' }).returning();
            return new Response(JSON.stringify({
                lesson: lesson
            })
            );
        }
        else{
            // Si ya existe una entrada, actualizar la entrada existente
            const lesson = await db.update(LessonProgress).set({ status: 'completado' }).where(and(eq(LessonProgress.userId, userId), eq(LessonProgress.lessonId, lessonId))).returning();
            return new Response(JSON.stringify({
                lesson: lesson
            })
            );
        }

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