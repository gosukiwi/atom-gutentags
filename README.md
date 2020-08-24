# atom-gutentags

This package will take care of generating a `tags` file using the `ctags` binary
whenever needed. That is, once, when loading, and then after each file is saved.

Gutentags is designed to work with [Universal Ctags](https://ctags.io/), the
latest and most maintained implementation of ctags, and is (unsurprisingly)
inspired by [vim-gutentags](https://github.com/ludovicchabant/vim-gutentags).

It will use your `.gitignore` file to know what files to ignore out of the box.

Note that if you don't have `ctags` installed, this will do nothing. It's
designed to "just work" and remain unnoticed and out of your way.

Atom [already provides support](https://atom.io/packages/symbols-view) for
tagfiles so you can use `symbols-view:go-to-declaration` to easily navigate 
through tags! (TIP: Bind it to something like `ctrl-]` or use 
[vim-mode-plus](https://atom.io/packages/vim-mode-plus))

# Ignoring Files

By default, `.gitignore` will be picked up. If you want to ignore some files
only when generating tags (eg: specs, or JSON files), create a `.tagignore`
file. Anything valid in a `.gitignore` file is also valid in a `.tagignore`
file.

# Why
There are similar plugins out there. But they do too much for my liking. All 
this does is manage the `tags` file, and nothing else.
