import { db, User } from "astro:db";
import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: 'sync-user-from-clerk',
});

export const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "user.created" },
    async ({ event, step, runId }) => {
        // Your function code
        const user = event.data; // The event payload's data will be the Clerk User json object
        const { id, public_metadata } = user as { id: string, public_metadata: { name: string, bonus: string }};
        const email = (user.email_addresses.find((e: { id: string }) =>
            e.id === user.primary_email_address_id
        ) as { email_address: string }).email_address;

        console.log(`User ${id} has been imported with ${email}`);

        const newUser =  await db.insert(User).values([{
            id: id,
            email: email,
            name: public_metadata.name,
            bonus: public_metadata.bonus ? true: false,
            courseEnrolled: 1,
        }])
        console.log(newUser);
        console.log(newUser.toJSON());

        console.log(newUser.rowsAffected);

    }
);


export const functions = [syncUser];
