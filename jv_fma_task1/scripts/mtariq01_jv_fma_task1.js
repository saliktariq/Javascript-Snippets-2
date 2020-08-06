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
Function applyFontStyleToParagraph() applies given font style value to the given element
Possible values for styleProperty: normal, italic, oblique, initial, inherit
Reference: https://www.w3schools.com/jsref/prop_style_fontstyle.asp
 */

function applyFontStyleToParagraph(elementName,styleProperty){ //elementName represents parent element, styleProperty represents font style value
    let paragraphs = document.getElementById(elementName);

    for(let index=1; index < paragraphs.children.length; index++){
        paragraphs.children[index].style.fontStyle = styleProperty;
    }

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

    for(let index=0; index <HEADLINES.length; index++){
        topSnippet = extractText(HEADLINES[index]) + ' ... ' + extractText(extractFirstParagraphChild(FIRSTLINES[index]));
        const TARGETID = document.getElementById("headlines");
        insertNewNode("p",topSnippet,TARGETID);
    }

    applyFontStyleToParagraph("headlines","italic");



}

window.onload = function () {
    printSnippets();
}