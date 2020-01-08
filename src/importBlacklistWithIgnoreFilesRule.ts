import * as Path from 'path'
import * as Lint from 'tslint'
import { findImports, ImportKind } from 'tsutils'
import * as TS from 'typescript'
import * as globToRegexp from 'glob-to-regexp'

interface IOptions {
  imports: string[]
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

  for (const ignoreFile of ctx.options.ignore) {
    const re = globToRegexp(ignoreFile)
    if (re.test(fileName)) return
  }


  for (const name of findImports(ctx.sourceFile, ImportKind.All)) {
    if (ctx.options.imports.indexOf(name.text) === -1) return

    ctx.addFailure(
        name.getStart(ctx.sourceFile) + 1,
        name.end - 1,
        Rule.FAILURE_STRING
    )
  }
}
