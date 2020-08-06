/*
An application to create and display snippets from news articles at the top of a HTML page.
 */

/*
Function collectHeadlines() to collect a Nodelist of all the headlines from a document
provided the element tag of headline.
 */

function collectHeadlines(elementName) { //Variable elementName contains the element tag containing the headline
    const HEADLINE = document.getElementsByTagName(elementName); //Constant HEADLINE to contain list of all headlines from given element
    return HEADLINE; //returns HEADLINE - a Nodelist
}

/*
Function extractFirstChild() to extract first child node from a given element
 */


function extractFirstParagraphChild(elementName) { //Variable elementName representing parent element
    return elementName.querySelector("p");

}

/*
Function extractText() to extract text from a specified element
 */

function extractText(elementName) { //Variable elementName representing element name from which text is to be extracted
    return elementName.innerHTML; //Returns text from the given element
}

/*
Function applyFontStyleToParagraph() applies given font style value to the given element
Possible values for styleProperty: normal, italic, oblique, initial, inherit
Reference: https://www.w3schools.com/jsref/prop_style_fontstyle.asp
 */

function applyFontStyleToParagraph(elementName, styleProperty) { //elementName represents parent element, styleProperty represents font style value
    let paragraphs = document.getElementById(elementName);

    for (let index = 1; index < paragraphs.children.length; index++) { //Using index=1 as start to skip heading tag
        paragraphs.children[index].style.fontStyle = styleProperty; //Applying styling to child element
    }

}

/*
Function insertNewNode() inserts new node AFTER a given node
Parameter newNodeType represents the type of new node to be inserted, newNodeText represents text of new node
and elementName represents the name of the element after which the new node must be inserted
 */

function insertNewNode(newNodeType, newNodeText, elementName) {
    const newNode = document.createElement(newNodeType); //Creating new node
    newNode.innerHTML = newNodeText; //Adding text to the new node
    elementName.appendChild(newNode); //Appending new node to parent element
}

/*
Function printSnippets() to print headlines and first line of each article at the top of the webpage
 */

function printSnippets() {
    const HEADLINES = collectHeadlines("h4"); //Constant to collect nodelist of h4
    const FIRSTLINES = collectHeadlines("article") //Constant to collect nodelist of articles

    for (let index = 0; index < HEADLINES.length; index++) { //looping through HEADINGS nodelist
        topSnippet = extractText(HEADLINES[index]) + ' ... ' + extractText(extractFirstParagraphChild(FIRSTLINES[index])); //creating string
        const TARGETID = document.getElementById("headlines"); //Fetching the target element
        insertNewNode("p", topSnippet, TARGETID); //Inserting generated element to parent element
    }

    applyFontStyleToParagraph("headlines", "italic"); //Applying CSS formatting
}

window.onload = function () {
    //Loading the printSnippets() function
    printSnippets();
}