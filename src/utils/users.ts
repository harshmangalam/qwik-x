import { db } from "~/database/connection";
import { users } from "~/database/schema/users";

async function getUsers(){
    const data = await db.select().from(users).

}