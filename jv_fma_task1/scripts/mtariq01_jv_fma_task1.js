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


function extractFirstChild(elementName){ //Variable elementName representing parent element
    const CHILD = elementName.firstChild; //Const CHILD containing first child of element elementName
    return CHILD; // returns first Child of the parent element - elementName
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
    let newNode = document.createElement(newNodeType); //Creating new element of given node type
    let nodeText = document.createTextNode(newNodeText); //Creating text node with given text
    newNode.appendChild(nodeText); //Appending the text nodeto the given node type
    let parentElement = document.getElementByID(elementName); //Creating variable to contain parent element
    // Reference: https://www.javascripttutorial.net/javascript-dom/javascript-insertafter/#:~:text=Summary%3A%20in%20this%20tutorial%2C%20you%20will%20learn%20how,after%20an%20existing%20node%20as%20a%20child%20node.
    parentElement.insertBefore(newNode,parentElement.nextSibling); //inserting newly created node
}

