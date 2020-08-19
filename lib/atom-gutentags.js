'use babel'
import Generator from './generator'
import Watcher from './watcher'
import { CompositeDisposable } from 'atom'

export default {
  subscriptions: null,

  activate (state) {
    this.subscriptions = new CompositeDisposable()
    this.generator = new Generator(this.subscriptions)
    this.watcher = new Watcher({ disposables: this.subscriptions, generator: this.generator })
  },

  deactivate () {
    this.subscriptions.dispose()
  }
}
