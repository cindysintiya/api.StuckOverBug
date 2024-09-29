const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  allowEIO3: true,
});

mongoose
  .connect(
    "mongodb+srv://cindysintiyaa:6wfu6CqE1NFJmQN9@cluster0.fgd4j.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected To MongoDB Database");
  })
  .catch((err) => {
    console.log(err);
  });

io.on("connection", (socket) => {
  // postRegister(socket);
  // postLogin(socket);

  getAllThreads(socket);

  socket.on("disconnect", () => {
    const lastToDisconnect = io.of("/").sockets.size === 0;
    if (lastToDisconnect) {
      try {
        if (global.gc) {
          global.gc();
        }
      } catch (e) {
        process.exit();
      }
    }
  });
});

// const userModel = require("./models/user");

// BACKEND API

const userRoutes = require("./routes/user");

app.use("/user", userRoutes);


// SOCKET API

// const postRegister = (socket) => {
//   socket.on("postRegister", cb => {
//     userModel
//       .findOne({ 
//         $or: [{ username: cb.username }, { email: cb.email }],
//       })
//       .then((user) => {
//         if (user) {
//           socket.emit("resRegister", { message: "Please use another username or email to register your new account." });
//         } else {
//           const user = new userModel({
//             username: cb.username,
//             password: cb.password,
//             // password: bcrypt.hashSync(cb.password, 8),
//             profile: cb.profile,
//             realname: cb.realname,
//             email: cb.email,
//           });
          
//           user
//             .save()
//             .then((user) => {
//               socket.emit("resRegister", { message: "User Registered Successfully", data: user });
//             })
//             .catch((err) => {
//               socket.emit("resRegister", { message: err.message });
//             });
//         }
//       });
//   })
// };

// const postLogin = (socket) => {
//   socket.on("postLogin", cb => {
//     userModel
//       .findOne({ username: cb.username, password: cb.password })
//       .then((user) => {
//         if (user) {
//           socket.emit("resLogin", { message: "Login info matched.", data: user });
//         } else {
//           socket.emit("resLogin", { message: "Wrong username or password. Please check again!" });
//         }
//       })
//       .catch((err) => {
//         socket.emit("resLogin", { message: err.message });
//       });
//   })
// };

const getAllThreads = (socket) => {
  socket.emit("getAllThreads", "hello world");
};

httpServer.listen(3005, () => {
  console.log(`Server Running On Port 3005`);
});
