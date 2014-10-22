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
    var transactions = statement.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;

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
            continue;
        }

        var output = company.name + ' is charging you ' + (-1 * transaction.TRNAMT) + ' per month (' + transaction.MEMO + ')';
        console.log(output);
    }
}
