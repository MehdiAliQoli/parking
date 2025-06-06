document.getElementById("payed").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
const vehicleNumber = document.getElementById("vehicle-number").value.trim();
    // Validate form fields
    const cardholder = document.getElementById("cardholder").value.trim();
    const cardnumber = document.getElementById("cardnumber").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const billing = document.getElementById("billing").value.trim();

    if (!cardholder || !cardnumber || !expiry || !cvv || !billing) {
        alert("Please fill in all the fields.");
        return;
    }

    // Show thank you message
    

    // Generate parking token content
   const tokenContent = `
        --------------------
        PARKPAL PARKING TOKEN
        ----------------------
        Cardholder Name: ${cardholder}
        Vehicle Number: ${vehicleNumber}
        Card Number: ${cardnumber.replace(/\d(?=\d{4})/g, "*")} 
        Expiry Date: ${expiry}
        Billing Address: ${billing}
        Date: ${new Date().toLocaleDateString()}
        Time: ${new Date().toLocaleTimeString()}

        ----------------------
        Thank you for using ParkPal!
        Show this token to the parking attendant.
        --------------------------------
        Note: This is a digital token. Please keep it safe.
        --------------------------------

`;
    alert("Thank you for selecting ParkPal! /n Your parking token has been generated.");
    // Create a downloadable file
    const blob = new Blob([tokenContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Parking_Token.txt";
    link.click();

    // Optionally, reset the form
    document.querySelector(".payment-form").reset();
});
