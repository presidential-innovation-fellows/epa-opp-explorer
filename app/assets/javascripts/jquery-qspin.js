(function ($) {
    var self = {};
    
    // Sets the debugmode - if true, you will see errors in the console log
    self.handleDebugMode = function (pParams) {
        // Set debugmode
        self.debug = false;
        if (typeof pParams !== 'undefined' && typeof pParams.debug !== 'undefined' && $.type(pParams.debug) === "boolean")
            self.debug = pParams.debug;

        // If no debugmode, hide errors
        if (!self.debug)
            console.error = function () { };
    }

    // Adds the spinner to any jquery Element
    $.fn.qspin = function (pParams) {
        // Set default options
        pParamList = {
            task: 'add',
            targetElement: $(this),
            background: 'transparent',
            spinnerImage: ""
        }
        // Override with userspecified parameters
        $.extend(pParamList, pParams);
        
        // If we just need to remove the spinner, we remove it and exit
        if (pParamList.task === 'rem')
        {
            $(this).find('.qspinner').remove();
            return;
        }
        
        if(pParams.spinnerImage === ''){
            if(!self.debug)
            console.error("Missing image: option.task");
        }

        // If we do not have any target to attach to, we have nothing to do here
        if (pParamList.targetElement === null) {
            if (self.debug)
                console.error("No target specified - paramlist: ", pParamList);

            return;
        }
        
        // Check whether we can work with the target elements css position attr
        var lTargetElPos = pParamList.targetElement.css('position').toLowerCase();
        if (lTargetElPos !== 'relative' && lTargetElPos !== 'absolute') {
            if (self.debug) {
                console.error("Position of the targetElement has to be relative or positive. Currently is: ", lTargetElPos);
                console.error("Setting it to relative, if visual errors occure, adjust the target.");
            }

            pParamList.targetElement.css('position', 'relative');
        }

        // The callbackfunction for imageanalyze func
        var lAnalyzeImagePromise = function (pImageRatio) {
            // Check if the image is valid
            if (typeof pImageRatio === 'undefined' || pImageRatio.x == 0 || pImageRatio.y == 0) {
                if (self.debug)
                    console.error("Faulty image: ", pImageRatio);

                return;
            }

            // Create a random selector for the new spinner
            var lRandomSelector = Math.floor((Math.random() * 10000) + 1000);

            // Create and set new spinner
            pParamList.targetElement.append('<div class="qspinner qspinner-' + lRandomSelector + '"></div>');
            var lNewSpinner = $('.qspinner-' + lRandomSelector);
            lNewSpinner.css('position', 'absolute');
            lNewSpinner.css('background', pParamList.background);
            lNewSpinner.css('top', '0');
            lNewSpinner.css('left', '0');
            lNewSpinner.css('bottom', '0');
            lNewSpinner.css('right', '0');

            // Now add the inner spinner image
            lNewSpinner.append('<img></img>');
            var lNewInnerSpinner = lNewSpinner.children('img');

            lNewInnerSpinner.prop('src', pParamList.spinnerImage);
            lNewInnerSpinner.css('position', 'absolute');
            lNewInnerSpinner.css('margin-left', -Math.abs(pImageRatio.x / 2));
            lNewInnerSpinner.css('left', '50%');
            lNewInnerSpinner.css('margin-top', -Math.abs(pImageRatio.y / 2));
            lNewInnerSpinner.css('top', '50%');
            // Return the spinner so the user can do whatever with it
            return $('.qspinner-' + lRandomSelector);
        }

        // Check whether the image is valid
        self.analyzeImage(pParamList.spinnerImage, lAnalyzeImagePromise)
    }

    // Analyzes the image that will be used for the spinner
    self.analyzeImage = function (pImageSource, pCallbackFunc) {
        lImage = new Image();
        lImage.src = pImageSource;

        // We have to do it like this because we cannot fetch the imageratio if it hasnt been loaded, default will be 0, 0
        lImage.onload = function () {
            pCallbackFunc({
                x: lImage.width,
                y: lImage.height
            });
        };
    }
} (jQuery));