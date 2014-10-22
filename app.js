var fs = require('fs');
var ofx = require('ofx');

var companies = [];
var companyConfigs = fs.readdirSync('companies/');
for (var i = 0; i < companyConfigs.length; i++) {
    var config = fs.readFileSync('companies/' + companyConfigs[i], 'utf8');
    companies.push(JSON.parse(config));
}

var file = process.argv[2];
if (file === undefined || file === null) {
    console.error("Need a file bro");
    return;
}

fs.readFile(file, 'utf8', function (err, data) {
    var statement = ofx.parse(data);
    var transactions = FindTransactionsList(statement);
    //console.log(transactions);

    for (var i = 0; i < transactions.length; i++) {
        var transaction = transactions[i];

        if (transaction.TRNTYPE !== "DEBIT") {
            continue;
        }

        ProcessLine(transaction);
    }
});

function ProcessLine(transaction) {
    for (var i = 0; i < companies.length; i++) {
        var company = companies[i];

        var regex = new RegExp(company.regex);
        var array = regex.exec(transaction.MEMO);

        if (array === null) {
            array = regex.exec(transaction.NAME);

            if (array === null) {
                continue;
            }
        }

        var output = company.name + ' is charging you $' + (-1 * transaction.TRNAMT) + ' per month (' + transaction.MEMO + ', ' + transaction.NAME + ')';
        console.log(output);
    }
}

function FindTransactionsList(statement) {
    if (statement.OFX.BANKMSGSRSV1 !== undefined) {
        return statement.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
    }

    if (statement.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.STMTTRN !== undefined) {
        return statement.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.STMTTRN;
    }

    throw "No provider found";
}