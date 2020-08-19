'use babel'
import { spawn } from 'child_process'
import { glob } from 'glob-gitignore'
import ignore from 'ignore'
import fs from 'fs'
import os from 'os'
import path from 'path'

const MAX_IDS = 10
let rotatingID = 0
function getRotatingUID () {
  rotatingID = (rotatingID + 1) % MAX_IDS
  return rotatingID
}

export default class Generator {
  constructor (disposables) {
    disposables.add(atom.commands.add('atom-workspace', {
      'atom-gutentags:generate': () => this.generate()
    }))

    this.ignores = {}
    this.setIgnores(atom.project.getPaths())
    disposables.add(atom.project.onDidChangePaths((paths) => this.setIgnores(paths)))
  }

  generate (filepath) {
    if (filepath === undefined) return this.all()

    const [project, relativepath] = atom.project.relativizePath(filepath)
    if (this.ignores[project].ignores(relativepath)) return

    const ctags = spawn('ctags', ['--append', relativepath], { cwd: project })
    ctags.on('error', (_error) => {
      console.warn('[ATOM-GUTENTAGS]: Tried to generate tags, but could not find a `ctags` executable.')
    })
  }

  // private

  all () {
    atom.project.getPaths().forEach((project) => {
      const options = { cwd: project, ignore: this.ignores[project] }
      glob(['**/*'], options).then((files) => {
        const tmpfile = path.join(os.tmpdir(), `atom-gutentags-tagfile-tmp${getRotatingUID()}`)
        fs.writeFileSync(tmpfile, files.join('\n'))

        const ctags = spawn('ctags', ['-L', tmpfile], { cwd: project })
        ctags.on('error', (_error) => {
          console.warn('[ATOM-GUTENTAGS]: Tried to generate tags, but could not find a `ctags` executable.')
        })
      })
    })
  }

  setIgnores (paths) {
    const ignores = {}
    paths.forEach((basepath) => {
      ignores[basepath] = ignore().add('package-lock.json') // we don't want to track this

      // add gitignore if it exists
      const gitignore = path.join(basepath, '.gitignore')
      if (fs.existsSync(gitignore)) {
        ignores[basepath].add(fs.readFileSync(gitignore).toString())
      }

      // add tagignore if it exists
      const tagignore = path.join(basepath, '.tagignore')
      if (fs.existsSync(tagignore)) {
        ignores[basepath].add(fs.readFileSync(tagignore).toString())
      }
    })
    this.ignores = ignores
  }
}
