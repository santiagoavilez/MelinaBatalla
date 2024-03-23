import type { ILesson } from "db/types";

// Define the Node class
class Node {
    constructor(public lesson: ILesson, public next: Node | null = null) { }
}

// Define the LinkedList class
export class LinkedList {
    head: Node | null = null;

    // Add a new node to the end of the list
    add(lesson: ILesson) {
        const node = new Node(lesson);

        if (!this.head) {
            this.head = node;
        } else {
            let tail = this.head;
            while (tail.next) {
                tail = tail.next;
            }
            tail.next = node;
        }
    }

    // Get the next lesson after the given one
    getNextLesson(lessonId: number) {
        let current = this.head;
        while (current && current.lesson.id !== lessonId) {
            current = current.next;
        }
        return current && current.next ? current.next.lesson : null;
    }
}

// Create a new linked list
const course = new LinkedList();