function getFormData(formId) {
    var data = {};
    var dataLabels = {};
    var inputs = document.getElementById(formId).getElementsByTagName('input');
    var labels = document.getElementById(formId).getElementsByTagName('label');

    for (var i = 0; i < labels.length; i++) {
        dataLabels[labels[i].getAttribute("htmlfor")] = labels[i].innerText;
    }

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "radio" || inputs[i].type == "checkbox") {
            if (!inputs[i].checked) continue;
        }
        data[inputs[i].name] = [ inputs[i].value, dataLabels[inputs[i].name] ];
    }
    return data;
}

function getFileName(formId) {
    var data = getFormData(formId);
    return data.projectCode[0] + "_" + ((data.gender || '') == '' ? '' : data.gender[0]) + "_" + data.age[0] + "_" + data.lastName[0] + "_" + data.firstName[0] + "_" + new Date().toISOString().substr(0, 19);
}

function saveCSV(dataHeader, data, fileName) {
    var textToSaveAsBlob = new Blob([data], {type: "text/csv"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var downloadLink = document.createElement("a");
    downloadLink.download = fileName + '.csv';
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = function (event) {
        document.body.removeChild(event.target);
    };
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function savePDF(dataHeader, data, fileName) {
    var doc = new jsPDF();
    doc.setFont("Courier");
    doc.setFontSize(12);
    var x = 25;
    var y = 35;

    var timestamp = fileName.split('_');
    timestamp = timestamp[timestamp.length - 1] + ' (UTC)';
    doc.text(timestamp, 122, 15);

    var interline = 7;

    for ([k, v] of Object.entries(dataHeader)) {
        doc.setFontStyle('bold');
        doc.text(v[1].trimEnd() + ":", x, y);
        doc.setFontStyle('normal');
        doc.text(v[0], x + 50, y);
        y += interline;
    }

    y += interline * 2;
    doc.setFontStyle('normal');
    var textBoxWidth = 200;
    var textLines = doc.splitTextToSize(data, textBoxWidth);
    doc.text(textLines, x, y);

    doc.save(fileName + '.pdf');
}

function appendBr(parentId) {
    var br = document.createElement("BR");
    document.getElementById(parentId).appendChild(br);
}

function appendLabel(parentId, label, name) {
    var l = document.createElement("LABEL");
    var t = document.createTextNode(label);
    l.appendChild(t);
    l.setAttribute("htmlFor", name);
    document.getElementById(parentId).appendChild(l);
}

function appendInputText(parentId, label, name) {
    appendLabel(parentId, label, name);
    appendBr(parentId);

    var t = document.createElement("INPUT");
    t.setAttribute("type", "text");
    t.setAttribute("id", name);
    t.setAttribute("name", name);
    document.getElementById(parentId).appendChild(t);
    appendBr(parentId);
    appendBr(parentId);
}

function appendInputNumber(parentId, label, name, min, max) {
    appendLabel(parentId, label, name);
    //appendBr(parentId);

    var n = document.createElement("INPUT");
    n.setAttribute("type", "number");
    n.setAttribute("id", name);
    n.setAttribute("name", name);
    n.setAttribute("min", min);
    n.setAttribute("max", max);
    document.getElementById(parentId).appendChild(n);
    appendBr(parentId);
    appendBr(parentId);
}

function appendRadio(parentId, label, name, options) {
    appendLabel(parentId, label, name);

    var r;
    for (value of options) {
        r = document.createElement("INPUT");
        r.setAttribute("type", "radio");
        r.setAttribute("id", value);
        r.setAttribute("value", value);
        r.setAttribute("name", name);
        document.getElementById(parentId).appendChild(r);
        appendLabel(parentId, value, value);
    }
    appendBr(parentId);
    appendBr(parentId);
}

function appendButton(parentId, text, onclick) {
    var b = document.createElement("BUTTON");
    var t = document.createTextNode(text);
    b.appendChild(t);
    b.setAttribute("onclick", onclick);
    b.addEventListener('click', function(event) {
        event.preventDefault();
    });
    document.getElementById(parentId).appendChild(b);
}

function savedata_html(parentId) {
    appendInputText(parentId, "Codice Progetto", "projectCode");
    appendInputText(parentId, "Nome", "firstName");
    appendInputText(parentId, "Cognome", "lastName");
    appendRadio(parentId, "Genere ", "gender", ["M", "F"]);
    appendInputNumber(parentId, "Età ", "age", 1, 100);
    appendButton(parentId, "Salva CSV", "saveCSV(getFormData('" + parentId + "'), outputdata.replace(/ +/g, ','), getFileName('" + parentId + "'))");
    appendBr(parentId);
    appendBr(parentId);
    appendButton(parentId, "Salva PDF", "savePDF(getFormData('" + parentId + "'), outputdata.replace(/\\d+/g, (match) => {return match.padStart(5, ' ');}), getFileName('" + parentId + "'))");
    appendBr(parentId);
    appendBr(parentId);
}