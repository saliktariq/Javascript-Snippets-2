/*
The application will create and display snippets from news articles at the top of a HTML page.
 */

/*
Function collectHeadlines() to collect a Nodelist of all the headlines from a document
provided the element tag of headline.
 */

function collectHeadlines(elementName){ //Variable elementName contains the element tag containing the headline
    const HEADLINE = document.getElementsByTagName(elementName); //Constant HEADLINE to contain list of all headlines from given element
    return HEADLINE; //returns HEADLINE - a Nodelist
}

/*
Function extractFirstChild() to extract first child node from a given element
 */


 function extractFirstParagraphChild(elementName){ //Variable elementName representing parent element
     return elementName.querySelector("p");

 }

/*
Function extractText() to extract text from a specified element
 */

function extractText(elementName){ //Variable elementName representing element name from which text is to be extracted
    return elementName.innerHTML; //Returns text from the given element
}

/*
Function applyFontStyle() applies given font style value to the given element
Possible values for styleProperty: normal, italic, oblique, initial, inherit
Reference: https://www.w3schools.com/jsref/prop_style_fontstyle.asp
 */

function applyFontStyle(elementName,styleProperty){ //elementName represents target element, styleProperty represents font style value
    return elementName.style.fontstyle = styleProperty; //returns element with given styleProperty value
}

/*
Function insertNewNode() inserts new node AFTER a given node
Parameter newNodeType represents the type of new node to be inserted, newNodeText represents text of new node
and elementName represents the name of the element after which the new node must be inserted
 */

function insertNewNode(newNodeType, newNodeText, elementName){
    let newNode = document.createElement(newNodeType);
    newNode.innerHTML = newNodeText;
    elementName.appendChild(newNode);
}

/*
Function printSnippets() to print headlines and first line of each article at the top of the webpage
 */

function printSnippets() {
    const HEADLINES = collectHeadlines("h4");
    const FIRSTLINES = collectHeadlines("article")
    let topSnippet = '';
    for(let index=0; index <HEADLINES.length; index++){
        topSnippet += extractText(HEADLINES[index]) + ' ... ' + extractText(extractFirstParagraphChild(FIRSTLINES[index])) + "<br>";
    }



    const TARGETID = document.getElementById("headlines");
    insertNewNode("p",topSnippet,TARGETID);
    let h2 = document.getElementsByTagName('h2');
    TARGETID.querySelector("p").style.fontStyle = "italic";
    TARGETID.querySelector("p").style.lineHeight = "1rem";
}

window.onload = function () {
    printSnippets();
}