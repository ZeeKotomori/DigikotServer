import Redis from "ioredis";

// Konfigurasi Redis
const redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
    password: "",
    db: 0
});

redis.on("connect", () => {
    console.log("Redis connected successfully");
});

redis.on("error", (err) => {
    console.error("Redis connection error:", err);
});

export default redis;
