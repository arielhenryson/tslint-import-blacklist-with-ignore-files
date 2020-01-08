import * as Path from 'path'
import * as Lint from 'tslint'
import { findImports, ImportKind } from 'tsutils'
import * as TS from 'typescript'
import * as globToRegexp from 'glob-to-regexp'


interface IOptions {
  imports: [IImport]
}


interface IImport {
  name: string
  ignore: string[]
}


export class Rule extends Lint.Rules.AbstractRule {
  static FAILURE_STRING = 'Unauthorized import'

  apply(sourceFile: TS.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, walk, this
        .ruleArguments[0] as IOptions)
  }
}

const walk = (ctx: Lint.WalkContext<IOptions>) => {
  if (ctx.options.imports === undefined) return

  const fileName = Path.basename(ctx.sourceFile.fileName)


  for (const importObj of ctx.options.imports) {
    for (const ignoreFile of importObj.ignore) {
      const re = globToRegexp(ignoreFile)
      if (re.test(fileName)) return
    }


    const imports = findImports(ctx.sourceFile, ImportKind.All)
    for (const name of imports) {
      if (importObj.name.indexOf(name.text) !== -1) {
        ctx.addFailure(
            name.getStart(ctx.sourceFile) + 1,
            name.end - 1,
            Rule.FAILURE_STRING
        )
      }
    }
  }
}
