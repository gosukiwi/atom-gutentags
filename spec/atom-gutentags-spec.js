'use babel'

import AtomGutentags from '../lib/atom-gutentags'

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

xdescribe('AtomGutentags', () => {
  let workspaceElement, activationPromise

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('atom-gutentags')
  })

  describe('when the atom-gutentags:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.atom-gutentags')).not.toExist()

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-gutentags:toggle')

      waitsForPromise(() => {
        return activationPromise
      })

      runs(() => {
        expect(workspaceElement.querySelector('.atom-gutentags')).toExist()

        const atomGutentagsElement = workspaceElement.querySelector('.atom-gutentags')
        expect(atomGutentagsElement).toExist()

        const atomGutentagsPanel = atom.workspace.panelForItem(atomGutentagsElement)
        expect(atomGutentagsPanel.isVisible()).toBe(true)
        atom.commands.dispatch(workspaceElement, 'atom-gutentags:toggle')
        expect(atomGutentagsPanel.isVisible()).toBe(false)
      })
    })
  })
})
