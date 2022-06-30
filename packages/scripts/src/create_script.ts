#!/usr/bin/env zx
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { $, chalk, fs, question } from 'zx'

/** @see https://stackoverflow.com/questions/64383909/dirname-is-not-defined-in-node-14-version */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const create_script = async (name: string) => {
  const path = `${__dirname}/${name}.ts`

  const exists = await fs.pathExists(path)

  if (exists) {
    console.log(
      chalk.blue(
        `A script with the same name is detected and the program will be terminated`
      )
    )
    process.exit(0)
  }

  console.log(chalk.blue(`Creating script`))
  await fs.writeFile(path, '#!/usr/bin/env zx')
  console.log(chalk.blue(`${path} Created`))

  console.log(chalk.blue(`The editor is being opened to edit the script`))
  await $`code ${path}`
  console.log(chalk.blue(`${path} Opened by editor`))
}

if (process.argv.length < 4) {
  const answer = await question(`Please specify the script name:`)

  if (answer === '') {
    console.log(
      chalk.yellow(
        `The program will be terminated because the script name is not specified`
      )
    )
    process.exit(0)
  }

  await create_script(answer)

  process.exit(0)
}

const filename = process.argv[3]
await create_script(filename)
