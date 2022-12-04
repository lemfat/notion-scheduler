import express from 'express';
// import router from './routes';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use('/', router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome!" });
})

// 3000ポートで受信
const port = process.env.PORT || 3000;

// APIサーバ起動
app.listen(port);
console.log('Express WebApi listening on port ' + port);