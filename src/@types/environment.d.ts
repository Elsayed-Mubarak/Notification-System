declare global {
	namespace NodeJS {
		interface ProcessEnv {
			//NODE_ENV: "development" | "production";
			UV_THREADPOOL_SIZE: number;
		}
	}
}

export {};
