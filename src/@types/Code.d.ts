interface Code {
  id: number
  lang: string
  path: string
  langKey: 'typescript' | 'python' | 'csharp' | 'rust' | 'go'
}

type Codes = Code[]
