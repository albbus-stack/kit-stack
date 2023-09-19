import type { InferSelectModel } from "drizzle-orm";
import { pgTable, timestamp, text, serial, boolean } from "drizzle-orm/pg-core";

export const post = pgTable("Post", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	content: text("content"),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	published: boolean("published").default(false).notNull(),
	authorId: text("authorId").references(() => user.id, { onDelete: "set null", onUpdate: "cascade" } ),
});
export type Post = InferSelectModel<typeof post>

export const user = pgTable("User", {
	id: text("id").primaryKey().notNull(),
	email: text("email").notNull().unique(),
	name: text("name"),
});
export type User = InferSelectModel<typeof user>