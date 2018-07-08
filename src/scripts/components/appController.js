
// Main controller for the app. Avoids the global scope.
export const appController = (function() {

    // Set up some variables
    var dragged,
    draggedClone,
    container = document.getElementById('wallpaper'),
    allIcons = document.getElementsByClassName('icon'),
    appNames = ['Instagram','YouTube','Snapchat','Messenger','Facebook','Google Maps','Netflix','Gmail','Bitmoji','Spotify Music','Uber','WhatsApp','Amazon','Cash App','Pandora Music','YouTube Music','musical.ly','Wish','Lyft','Hulu','Movies Diary','FOX Sports','Waze','Google Photos'];


    // Create the icons divs and load them into the DOM
    const buildLayout = (number) => {
        for(var i = 1; i <= number; i++) {
            var markup = `
            <div class="icon__container">
                <div class="icon icon__${i}" draggable="true"><span class="icon__label">${appNames[i-1]}</span></div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', markup);
        }
    };


    // Add animations to icons
    const addIconAnimations = () => {
        for (let icons of allIcons) {
            icons.classList.add('icon--dragging');
        }
    };


    // Remove animations from icons
    const removeIconAnimations = () => {
        for (let icons of allIcons) {
            icons.classList.remove('icon--dragging');
        }
    };


    // Find the index of the icon
    const findIconIndex = (container, element) => {
        const location = Array.prototype.indexOf.call(container, element);
        return location;
    };


    // Create a custom 'ghost' drag element
    // (Note: Only works in firefox right at the moment. Chrome blocks the rendering of an element outside of the viewport.
    // IE and Edge have problems too. Im leaving it in for the time being)
    const createGhostDragElement = (element, event) => {
        // Make a copy of the icon being dragged, style it and add it to the DOM
        draggedClone = element.cloneNode(true);
        draggedClone.classList.add('icon--grabbed');
        document.body.appendChild(draggedClone);

        // Place the cursor in the center of the 80x80 icon
        return event.dataTransfer.setDragImage(draggedClone, 40, 40);
    };


    // Remove the custom 'ghost' drag element
    // (NOTE: See above)
    const removeGhostDragElement = () => {
        document.body.removeChild(draggedClone);
    };


    // When the dragging starts
    const handleDragStart = (event) => {
        let targetData = event.target.childNodes[0].innerHTML;
        event.dataTransfer.setData('text', `${targetData}`);
        dragged = event.target;
        //createGhostDragElement(dragged, event);
        addIconAnimations();
    };


    // When you drag over an element
    const handleDragOver = (event) => {
        event.preventDefault();
        return false;
    };


    // When you enter an element
    const handleDragEnter = (event) => {
        event.target.classList.add('icon--over');
        event.target.childNodes[0].classList.add('icon__label--over');
    };


    // When you leave an element
    const handleDragLeave = (event) => {
        event.target.classList.remove('icon--over');
        event.target.childNodes[0].classList.remove('icon__label--over');
    };


    // When you drop it like its hot
    const handleDrop = (event) => {
        var targetParent = event.target.parentNode,
            draggedParent = dragged.parentNode,
            targetIndex = findIconIndex(container.children, targetParent),
            draggedIndex = findIconIndex(container.children, draggedParent);
        
        event.preventDefault();
        event.target.classList.remove('icon--over');

        removeIconAnimations();
        //removeGhostDragElement();
    
        if (targetIndex < draggedIndex) {
            draggedParent = container.insertBefore(draggedParent, targetParent);  
        } else {
            draggedParent = container.insertBefore(draggedParent, targetParent.nextSibling);  
        }
    };


    // Event listeners for the drag events
    // Have the event bubble up from the body instead of attaching a handler to every single icon element
    const setupEventListeners = () => {
        document.body.addEventListener('drag', function(event) {
        }, false);


        document.body.addEventListener('dragstart', function(event) {
            if (event.target.classList.contains('icon')) {
                handleDragStart(event);
            }
        }, false);


        document.body.addEventListener('dragenter', function(event) {
            if (event.target.classList.contains('icon')) {
                handleDragEnter(event);
            }
        }, false);


        document.body.addEventListener('dragover', function(event) {
            if (event.target.classList.contains('icon')) {
                handleDragOver(event);
            }
        }, false);


        document.body.addEventListener('dragleave', function(event) {
            if (event.target.classList.contains('icon')) {
                handleDragLeave(event);
            }
        }, false);


        // In case of a failed drop event
        document.body.addEventListener('dragend', function(event) {
            event.preventDefault();
            removeIconAnimations();
        }, false);


        document.body.addEventListener('drop', function(event) {
            if (event.target.classList.contains('icon')) {
                handleDrop(event);
            }
        }, false);
    };



    return {
        init: function() {
            buildLayout(24);
            setupEventListeners();
        }
    };

})();