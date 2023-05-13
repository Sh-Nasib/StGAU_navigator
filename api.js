import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

/**
 * @middleware
 *
 * TODO: CORS, csrf, api, pool, static
 */

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page not found' })
})

app.listen(8080, () => console.log(`Сервер запущен и ожидает подключения на порте ${8080}...`))