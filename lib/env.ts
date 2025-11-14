import { object, string } from "zod";

const envSchema = object({
	NEXT_PUBLIC_API_BASE_URL: string().url({
		message: "The NEXT_PUBLIC_API_BASE_URL variable must be a valid URL.",
	}),
	NEXT_PUBLIC_SUPABASE_URL: string().url({
		message: "The NEXT_PUBLIC_SUPABASE_URL variable must be a valid URL.",
	}),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: string().jwt({
		message: "The NEXT_PUBLIC_SUPABASE_ANON_KEY variable must be a JWT.",
	}),
});

export const env = envSchema.parse({
	NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
