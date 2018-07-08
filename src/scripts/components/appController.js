export const appController = (function() {

    var dragged,
    draggedClone,
    container = document.getElementById('wallpaper'),
    allIcons = document.getElementsByClassName('icon');


    // Add animations to icons
    const addIconAnimations = () => {
        Array.prototype.forEach.call(allIcons, child => {
            child.classList.add('icon--dragging');
        });
    };


    // Remove animations from icons
    const removeIconAnimations = () => {
        Array.prototype.forEach.call(allIcons, child => {
            child.classList.remove('icon--dragging');
        });
    };


    // Find the index of the icon
    const findIconIndex = (container, element) => {
        const location = Array.prototype.indexOf.call(container, element);
        return location;
    };


    // Create a custom 'ghost' drag element
    // Only works in firefox right now
    const createGhostDragElement = (element, event) => {
        // Make a copy of the icon being dragged, style it and add it to the DOM
        draggedClone = element.cloneNode(true);
        draggedClone.classList.add('icon--grabbed');
        document.body.appendChild(draggedClone);

        // Place the cursor in the center of the 80x80 icon
        return event.dataTransfer.setDragImage(draggedClone, 40, 40);
    };


    // Remove the custom 'ghost' drag element
    const removeGhostDragElement = () => {
        document.body.removeChild(draggedClone);
    };


    // When the dragging starts
    const handleDragStart = (event) => {
        let targetData = event.target.childNodes[0].innerHTML;
        event.dataTransfer.setData('text', `${targetData}`);
        dragged = event.target;
        createGhostDragElement(dragged, event);
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
    };


    // When you leave an element
    const handleDragLeave = (event) => {
        event.target.classList.remove('icon--over');
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
        removeGhostDragElement();
    
        if (targetIndex < draggedIndex) {
            draggedParent = container.insertBefore(draggedParent, targetParent);  
        } else {
            draggedParent = container.insertBefore(draggedParent, targetParent.nextSibling);  
        }
    };


    const setupEventListeners = () => {
        // Event listeners for the drag events
        document.body.addEventListener('drag', function (event) {
        }, false);


        document.body.addEventListener('dragstart', function (event) {
            if (event.target.classList.contains('icon')) {
                handleDragStart(event);
            }
        }, false);


        document.body.addEventListener('dragenter', function (event) {
            if (event.target.classList.contains('icon')) {
                handleDragEnter(event);
            }
        }, false);


        document.body.addEventListener('dragover', function (event) {
            if (event.target.classList.contains('icon')) {
                handleDragOver(event);
            }
        }, false);


        document.body.addEventListener('dragleave', function (event) {
            if (event.target.classList.contains('icon')) {
                handleDragLeave(event);
            }
        }, false);


        document.body.addEventListener('drop', function (event) {
            if (event.target.classList.contains('icon')) {
                handleDrop(event);
            }
        }, false);
    };


    return {
		init: function() {
			setupEventListeners();
		}
};

})();