const config = {
  port: process.env.PORT || 3000,
  db: "mongodb+srv://book:1234@cluster0.5dlmmv4.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0",
  serviceKey: process.env.SERVICE_KEY || "default-key",
};

export default config;
