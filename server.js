const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/productRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", productRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
