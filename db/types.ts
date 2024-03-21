
import { Lessons } from "astro:db";
export type ILesson = typeof Lessons.$inferSelect;