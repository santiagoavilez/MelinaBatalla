import { serve } from "inngest/astro";
import { functions, inngest} from "src/inngest/client";
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions,
});