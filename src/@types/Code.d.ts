interface Code {
  id: number
  lang: string
  path: string
  langKey: 'typescript' | 'python' | 'csharp' | 'rust' | 'go' | 'c' | 'cpp' | 'java' | 'kotlin' | 'scala' | 'haskell' | 'ruby' | 'php' | 'perl' | 'bash' | 'swift' | 'r' | 'dart' | 'groovy' | 'lua' | 'julia' | 'elixir' | 'clojure' | 'fsharp' | 'nim' | 'ocaml' | 'racket' | 'scheme' | 'vb' | 'cobol' | 'fortran' | 'pascal'
}

type Codes = Code[]
