import options from "./options.js";

let instance;

function setupSplit(left, right) {
    if (instance) {
        instance.destroy();
        instance = null;
    }

    if (!left && !right) {
        $("#center-pane").css('width', '100%');

        return;
    }

    let leftPaneWidth = options.getInt('leftPaneWidth');
    if (!leftPaneWidth || leftPaneWidth < 5) {
        leftPaneWidth = 5;
    }

    let rightPaneWidth = options.getInt('rightPaneWidth');
    if (!rightPaneWidth || rightPaneWidth < 5) {
        rightPaneWidth = 5;
    }

    console.log(leftPaneWidth, rightPaneWidth);

    if (left && right) {
        instance = Split(['#left-pane', '#center-pane', '#right-pane'], {
            sizes: [leftPaneWidth, 100 - leftPaneWidth - rightPaneWidth, rightPaneWidth],
            gutterSize: 5,
            onDragEnd: sizes => {
                options.save('leftPaneWidth', Math.round(sizes[0]));
                options.save('rightPaneWidth', Math.round(sizes[2]));
            }
        });
    }
    else if (left) {
        instance = Split(['#left-pane', '#center-pane'], {
            sizes: [leftPaneWidth, 100 - leftPaneWidth],
            gutterSize: 5,
            onDragEnd: sizes => {
                options.save('leftPaneWidth', Math.round(sizes[0]));
            }
        });
    }
    else if (right) {
        instance = Split(['#center-pane', '#right-pane'], {
            sizes: [100 - rightPaneWidth, rightPaneWidth],
            gutterSize: 5,
            onDragEnd: sizes => {
                options.save('rightPaneWidth', Math.round(sizes[1]));
            }
        });
    }
}

export default {
    setupSplit
};
