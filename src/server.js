import dotenv from "dotenv";
dotenv.config();

const FRAMEWORK = process.env.FRAMEWORK || "express";
const DATABASE = process.env.DATABASE || "nosql";

let app;

const startServer = async () => {
  // Menginisialisasi koneksi database
  if (DATABASE === "sql") {
    const { connectSQL } = await import("./database/ConnectSql.js");
    await connectSQL();
  } else if (DATABASE === "nosql") {
    const { connectNoSQL } = await import("./database/ConnectNoSql.js");
    await connectNoSQL();
  }

  // Menginisialisasi framework
  if (FRAMEWORK === "express") {
    app = (await import("./frameworks/express/app.js")).default;
  } else if (FRAMEWORK === "nestjs") {
    // const { NestFactory } = await import("@nestjs/core");
    // const { AppModule } = await import("./frameworks/nestjs/app.module.ts");
    // app = await NestFactory.create(AppModule);
    console.log('NestJs not found')
  }

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on ${FRAMEWORK} with ${DATABASE} database`);
  });
};

startServer();