const template = Handlebars.compile("<div> {{name}} </div>");
const html = template ({
    name: "hello pidr"
});
console.log(html);

var source = document.getElementById("entry-template").innerHTML;
var template2 = Handlebars.compile(source);

const html2 = template2({
    title:"gnida",
    body:"poganaya"
});

document.body.innerHTML = html2;