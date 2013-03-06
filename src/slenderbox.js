/*
 * Slenderbox - A Lightweight Lightbox Script
 * Copyright (c) 2012 Matthew Petroff
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function(window, document, undefined){
    var sboxWrapper, sboxOverlay, slenderbox, sboxImgH, sboxLoad, sboxImg,
        sboxX, sboxTitle, sboxNum, sboxNext, sboxNextA, sboxPrev, sboxPrevA,
        image, gallery, galleryNum, multipleImg;
    
    // Override clicks on links with data-sbox property
    document.addEventListener('DOMContentLoaded', function() {
        [].forEach.call(document.querySelectorAll('[data-sbox]'), function(el) {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                createSlenderBox(el);
            }, false);
        });
    }, false);
    
    // Create lightbox
    function createSlenderBox(photo) {
        // Create objects
        sboxWrapper = createDiv('sboxWrapper', document.body);
        sboxOverlay = createDiv('sboxOverlay', sboxWrapper);
        slenderbox = createDiv('slenderbox', sboxWrapper);
        sboxImgH = createDiv('sboxImgH', slenderbox);
        sboxLoad = createDiv('sboxLoad', sboxImgH);
        sboxLoading = createDiv('sboxLoading', sboxLoad);
        sboxImg = createDiv('sboxImg', sboxImgH);
        sboxX = createDiv('sboxX', slenderbox);
        sboxTitle = createDiv('sboxTitle', slenderbox);
        sboxNum = createDiv('sboxNum', slenderbox);
        sboxNext = createDiv('sboxNext', slenderbox);
        sboxPrev = createDiv('sboxPrev', slenderbox);
        sboxNextA = createDiv('sboxNextA', sboxNext);
        sboxPrevA = createDiv('sboxPrevA', sboxPrev);
        
        // Initial sizing
        slenderbox.style.left = sboxOverlay.clientWidth/2 - (300 + 20)/2 + 'px';
        slenderbox.style.top = sboxOverlay.clientHeight/2 - (300 + 20)/2 + 'px';
        slenderbox.className = 'sboxTransitions';
        sboxWrapper.style.opacity = 1;
        
        // Event handlers
        sboxX.addEventListener('click', destroySlenderBox, false);
        sboxOverlay.addEventListener('click', destroySlenderBox, false);
        sboxNext.addEventListener('click', nextImage, false);
        sboxPrev.addEventListener('click', prevImage, false);
        document.addEventListener('keydown', onKeyDown, false);
        window.addEventListener('resize', onResize, false);
        
        // Add image
        changeImage(photo);
    }
    
    // Display image in lightbox
    function changeImage(photo) {
        // Hide old image
        sboxImg.style.opacity = 0;
        sboxLoad.style.display = 'inline';
        
        // Add image
        image = new Image();
        image.onload = function(photo) {
            // Shrink image to fit
            var origHeight = image.height, origWidth = image.width;
            if(image.height > sboxOverlay.clientHeight - 55 - 80) {
                image.height = sboxOverlay.clientHeight - 55 - 80;
                image.width = image.width * image.height / origHeight;
            }
            if(image.width > sboxOverlay.clientWidth - 20 - 80) {
                image.width = sboxOverlay.clientWidth - 20 - 80;
                image.height = origHeight * image.width / origWidth;
            }
            sboxImg.style.height = image.height + 'px';
            sboxImg.style.width = image.width + 'px';
            slenderbox.style.height = image.height + 55 + 'px';
            slenderbox.style.width = image.width + 20 + 'px';
            
            // Center image and loading icon
            slenderbox.style.left = sboxOverlay.clientWidth/2 - (image.width + 20)/2 + 'px';
            slenderbox.style.top = sboxOverlay.clientHeight/2 - (image.height + 20)/2 + 'px';
            sboxLoad.style.left = image.width/2 - 30/2 + 10 + 'px';
            sboxLoad.style.top = image.height/2 - 30/2 + 10 + 'px';
            
            // Size and position next and previous click areas
            sboxNext.style.height = image.height + 20 + 'px';
            sboxNext.style.width = image.width/2 + 'px';
            sboxNextA.style.top = image.height/2 + 10 - 47/2 + 'px';
            sboxPrev.style.height = sboxNext.style.height;
            sboxPrev.style.width = sboxNext.style.width;
            sboxPrevA.style.top = sboxNextA.style.top;
            
            // Show image
            sboxLoad.style.display = 'none';
            setTimeout(function() {
                sboxImg.style.backgroundImage = 'url(' + image.src + ')';
                sboxImg.style.opacity = 1;
            },300);
            
            // Preload next image
            if(galleryNum < gallery.length - 1) {
                new Image().src = gallery.item(galleryNum + 1);
            }
        };
        
        // Get gallery information
        //gallery = document.querySelectorAll('[data-sbox="' + photo.dataset.sbox + '"]');
        gallery = document.querySelectorAll('[data-sbox="' + photo.getAttribute('data-sbox') + '"]');
        for(var i = 0; i < gallery.length; i++) {
            if(gallery.item(i) == photo) {
                galleryNum = i;
                i = gallery.length;
            }
        }
        //if(photo.dataset.sbox != '') {
        if(photo.getAttribute('data-sbox') != '') {
            multipleImg = true;
        } else {
            multipleImg = false;
        }
        
        // Set image.src after finding galleryNum, as galleryNum is used in image.onload
        image.src = photo;
        
        // Add image information and next and previous areas
        sboxTitle.innerHTML = photo.title;
        if(gallery.length > 1 && multipleImg) {
            sboxNum.innerHTML = 'Image ' + (galleryNum + 1) + ' of ' + gallery.length;
            if(galleryNum > 0) {
                sboxPrev.style.display = 'inline';
            } else {
                sboxPrev.style.display = 'none';
            }
            if(galleryNum < gallery.length - 1) {
                sboxNext.style.display = 'inline';
            } else {
                sboxNext.style.display = 'none';
            }
        }
    }
    
    // Load next image in gallery
    function nextImage() {
        changeImage(gallery.item(galleryNum + 1));
    }
    
    // Load previous image in gallery
    function prevImage() {
        changeImage(gallery.item(galleryNum - 1));
    }
    
    // Remove lightbox
    function destroySlenderBox() {
        sboxWrapper.style.opacity = 0;
        setTimeout(function() {
            try{
                sboxWrapper.parentNode.removeChild(sboxWrapper);
            } catch(e) {}
        }, 300);
        document.removeEventListener('keydown', onKeyDown, false);
        window.removeEventListener('resize', onResize, false);
    }
    
    // Keyboard controls
    function onKeyDown(event) {
        // Override default action
        event.preventDefault();
        
        // Record key pressed
        var keyNumber = event.keyCode;
        
        // Keyboard actions
        if(keyNumber == 39) {           // If right arrow is pressed
            if(galleryNum < gallery.length - 1 && multipleImg) {
                nextImage();
            }
        } else if(keyNumber == 37) {    // If left arrow is pressed
            if(galleryNum > 0 && multipleImg) {
                prevImage();
            }
        } else if(keyNumber == 27) {    // If Esc key is pressed
            destroySlenderBox();
        }
    }
    
    // Resize lightbox on window resize
    function onResize() {
        changeImage(gallery.item(galleryNum));
    }
    
    // Helper function
    function createDiv(divName, parent) {
        var newDiv = document.createElement('div');
        newDiv.id = divName;
        parent.appendChild(newDiv);
        return newDiv;
    }
})(window, document);
