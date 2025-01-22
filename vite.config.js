import { defineConfig } from "vite";
export default defineConfig({
	base: "/UnnamedTierlistMaker/",
	server: {
		port: 8080,
		host: "localhost",
		open: true,
		strictPort: true,
	},
});
