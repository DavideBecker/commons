module.exports.errorHandler = (err) => {
    console.log()
    console.log('    ERROR'.red)
    console.log('    Plugin', err.plugin.help, 'encountered', err.name)
    console.log('    In', err.fileName.warn, 'on line', String(err.loc.line + ':' + err.loc.column).error)
    console.log()
    console.log('    ', err.message)
    console.log(err.codeFrame)
    console.log()
}

module.exports.fixedLength = (str, len) => str + Array(len).join(' ').slice(-len + str.length);

module.exports.prettyLint = (result) => {
    if (result.messages.length) {
        console.log('');
        console.log('    ESLint result for', result.filePath);
        console.log('    # Warnings: ', result.warningCount);
        console.log('    # Errors:   ', result.errorCount);
        result.messages.forEach(function (err) {
            console.log(
                '    ' +
                fixedLength(err.ruleId ? err.ruleId : '', 32).info +
                fixedLength('Line ' + err.line + ':' + err.column, 16).verbose +
                fixedLength(eslintErrorSeverity[err.severity], 10) + ' ' + err.message);
        });
    }
}
