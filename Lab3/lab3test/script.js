$(function () {
    var LIST = $('.main .center .left .container');
    var ITEM_TEMPLATE = $('.main .center .left .container').html();
    var RIGHT_LIST = $('#rActive');
    var RIGHT_LIST_PURCHASED = $('#rPurchased');
    var RIGHT_ITEM_TEMPLATE = $('#rActive').html();

    var CORRECT_PURCHASED_TEXT = $(ITEM_TEMPLATE).find('#purchaseButton').text();

    $('.main .center .left .container').html('');
    $('#rActive').html('');

    var ANIMATION_TIME = 700;
    var APPEAR_TIME = 150;

    $('#addButton').click(function () {
        var title = $('#input').val();

        if (title)
            addItem(title);
    });

    $('#input').keyup(function () {
        if (event.keyCode === 13)
        {
            var title = $('#input').val();

            if (title)
                addItem(title);
        }
    });

    $('#input').focus(function () {
        $(this).select();
    });

    addItem("Помідори");
    addItem("Печиво");
    addItem("Сир");

    function addItem(title) {
        console.log(title);

        var node = $(ITEM_TEMPLATE);
        var right_node = $(RIGHT_ITEM_TEMPLATE);
        var right_node_2 = $(RIGHT_ITEM_TEMPLATE);

        function setNewName(newName) {
            if (newName.length > 16)
                newName = newName.substring(0, 15) + "...";
            node.find('#productName').text(newName);
            right_node.find('#rProductName').text(newName);
            right_node_2.find('#rProductName').text(newName);
        }

        setNewName(title);

        node.find('#productNameInput').hide();

        node.find('#removeButton').click(function () {
            node.fadeOut(ANIMATION_TIME);
            setTimeout(function () {
                right_node.remove();
                node.remove();
            }, ANIMATION_TIME + 10);
        });

        node.find('#incButton').click(function () {
            var count = parseInt(node.find('#quantity').text());
            count += 1;
            node.find('#incButton').prop("disabled",true);
            node.find('#quantity').fadeOut(APPEAR_TIME);
            setTimeout(function () {
                node.find('#quantity').text(count);
                right_node.find('#rQuantity').text(count);
                right_node_2.find('#rQuantity').text(count);
                node.find('#quantity').fadeIn(APPEAR_TIME);
                node.find('#incButton').prop("disabled",false);
                node.find('#decButton').prop("disabled",false);
            }, APPEAR_TIME);
        });

        node.find('#decButton').prop("disabled", true);
        node.find('#decButton').click(function () {
            var count = parseInt(node.find('#quantity').text());
            count -= 1;
            node.find('#decButton').prop("disabled",true);
            node.find('#quantity').fadeOut(APPEAR_TIME);
            setTimeout(function () {
                node.find('#quantity').text(count);
                right_node.find('#rQuantity').text(count);
                right_node_2.find('#rQuantity').text(count);
                node.find('#quantity').fadeIn(APPEAR_TIME);
                if (count > 1)
                    node.find('#decButton').prop("disabled",false);
            }, APPEAR_TIME);
        });

        node.find('#purchaseButton').click(function () {
            if (node.find('#purchaseButton').text().localeCompare(CORRECT_PURCHASED_TEXT) == 0) {
                node.fadeOut(APPEAR_TIME);
                setTimeout(function () {
                    node.find("#incButton").hide();
                    node.find("#decButton").css('transform', 'scale(0, 0)');
                    node.find("#removeButton").hide();
                    node.find("#purchaseButton").css('width', '116');
                    node.find("#purchaseButton").text("Не куплено");

                    node.fadeIn();
                    right_node.hide();
                    RIGHT_LIST_PURCHASED.append(right_node_2);
                }, APPEAR_TIME);
            } else {
                node.fadeOut(APPEAR_TIME);
                setTimeout(function () {
                    node.find("#incButton").show();
                    node.find("#decButton").css('transform', 'scale(1, 1)');
                    node.find("#removeButton").show();
                    node.find("#purchaseButton").css('width', 'auto');
                    node.find("#purchaseButton").text(CORRECT_PURCHASED_TEXT);

                    node.fadeIn();
                    right_node.show();
                    right_node_2.remove();
                }, APPEAR_TIME);
            }
        });

        node.find('#productName').click(function () {
            if (node.find('#purchaseButton').text().localeCompare(CORRECT_PURCHASED_TEXT) == 0) {
                node.find('#productName').hide();
                node.find('#productNameInput').show();
                node.find('#productNameInput').select();
            }
        });

        node.find('#productNameInput').keyup(function () {
            if (event.keyCode === 13) {
                if (node.find('#productNameInput').val())
                    setNewName(node.find('#productNameInput').val());
                node.find('#productNameInput').hide();
                node.find('#productName').show();
            }
        });

        node.find('#productNameInput').focusout(function () {
            if (node.find('#productNameInput').val())
                setNewName(node.find('#productNameInput').val());
            node.find('#productNameInput').hide();
            node.find('#productName').show();
        });

        node.fadeIn(ANIMATION_TIME);
        //right_node.fadeIn("slow");

        LIST.append(node);
        setTimeout(function(){
            RIGHT_LIST.append(right_node)
        }, ANIMATION_TIME + 10);

        $('#input').val("Назва товару");
        $('#input').select();
    }
});