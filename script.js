const PHONE = "212688134940";

const PRICE = 150;

let quantity = 1;

function setQuantity(qty){
    quantity = qty;

    let finalQty = qty;

    if(qty === 4){
        finalQty = 4;
    }

    const total = PRICE * finalQty;

    document.getElementById("totalPrice").innerText = `DH ${total}`;

    const message = `سلام، بغيت نطلب ${finalQty} من Asel Sultan بثمن ${total} DH`;

    const whatsappURL = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

    document.getElementById("whatsappBtn").href = whatsappURL;
}

setQuantity(1);
