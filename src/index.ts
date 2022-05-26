import express from 'express';
import { messageError4xx, messageSuccess2xx } from './utils/httpUtils';
import { createConnection, insertRows, selectRows } from './db/database';

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
const PORT = process.env.HTTP_PORT || 3000

// Your code starts here. Placeholders for .get and .post are provided for your convenience.

app.post('/candidato/register', async function (req, res) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return messageError4xx(res, 400, { message: 'Body must not be empty' })
    } else {
      await insertRows(req)
      return messageSuccess2xx(res, 200, { message: 'Inserted Successfully' })
    }
  } catch (error) {
    console.error(error)
  }
});

app.get('/candidato/:skills', async function (req, res, err) {
  try {
    if (!req.params.skills) {
      return messageError4xx(res, 400, { message: 'Skills must not be empty' })
    } else {
      const skillsReq = req.params.skills.split(',')
      const response = await selectRows() as any[]
      let comparative = []

      for (let index = 0; index < response.length; index++) {
        let iguales = 0
        const candidato = response[index];
        const objSkillList = candidato.skills.split(',')
        skillsReq.forEach(i => {
          objSkillList.forEach((j: string) => {
            if (i === j) iguales++
          })
        })
        comparative.push({ candidato, count: iguales })
      }
      comparative.sort((a, b) => b.count - a.count)
      let max = Math.max.apply(Math, comparative.map((o) => o.count))
      if (!comparative[0] || (comparative && comparative[0]?.count === 0)) {
        return messageSuccess2xx(res, 200, { message: 'No results found' })
      } else {
        return messageSuccess2xx(res, 200, comparative.filter((c) => c.count === max))
      }
    }
  } catch (error) {
    console.error(error)
  }
});

app.get('*', function(req, res){
  messageError4xx(res, 404, 'Page not found')
});

app.listen(PORT).on('listening', () => {
  console.info('Listening on port', PORT)
  createConnection()
});