import path from "path"
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import colors from "colors"
import fileupload from "express-fileupload"
import cookieParser from "cookie-parser"
import sanitize from "express-mongo-sanitize"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import hpp from "hpp"
import cors from "cors"
import bodyparse from "body-parser"

// Imports //
//import connectDB from "./config/db.js"


// import routes //

// Load env vars //
dotenv.config({ path: "./config/config.env" })

const app = express()
//connectDB()

// Middleware //
app.use(helmet())
app.use(bodyparse.json())
app.use(bodyparse.urlencoded())

// rate limiting //
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
})
app.use(limiter)
// prevent http param polution //
app.use(hpp())
// cross domain access //
app.use(cors())
// sanitize data //
app.use(sanitize())
// prevent cross site scripting attack //
// app.use(xss())

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}
// accept json data //
app.use(express.json({ extended: false }))
// file uploading //
app.use(fileupload())
// cookie parser //
app.use(cookieParser())

app.get("/", (req, res) => {
  res.status(200).json({
    sucess: true,
    message: "The fcfgc hvh ",
  })
})

// Routes //




const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow
      .bold
  )
})

// Handle unhandled promise rejections //
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold)
  // Close server & exit process //
  server.close(() => process.exit(1))
})
