'use babel'

export default class Watcher {
  constructor ({ generator, disposables }) {
    this.generator = generator
    this.generate()

    disposables.add(atom.workspace.observeTextEditors((editor) => {
      disposables.add(editor.onDidSave(() => this.generate(editor.getPath())))
    }))
  }

  generate (path) {
    this.generator.generate(path)
  }
}
