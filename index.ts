import express from 'express'
const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.listen(3000, () => {
  console.log("Start on port 3000.")
})

app.get('/yesterday', (req, res) => {
  let date = new Date()
  date.setDate(date.getDate() - 1);
  res.json({ yesterday: date })
})

type User = {
  id: number
  name: string
  email: string
};

const users: User[] = [
  { id: 1, name: "User1", email: "user1@test.local" },
  { id: 2, name: "User2", email: "user2@test.local" },
  { id: 3, name: "User3", email: "user3@test.local" }
]

app.get('/users', (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(users))
})