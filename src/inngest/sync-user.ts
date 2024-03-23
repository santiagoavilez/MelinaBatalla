import { inngest } from "./client";

export default inngest.createFunction(
    { id: "import-product-images" },
    { event: "clerk/user.created" },
    async ({ event, step, runId }) => {
        // Your function code
        const user = event.data; // The event payload's data will be the Clerk User json object
        const { id, first_name, last_name } = user;
        console.log(`User ${id} has been imported`);
    }
);