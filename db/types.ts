
import { Lesson } from "astro:db";
export type ILesson = typeof Lesson.$inferSelect;

import { LessonProgress } from "astro:db";
export type ILessonProgress = typeof LessonProgress.$inferSelect;