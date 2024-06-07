let x;

document.getElementById("x").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        x = document.getElementById("x").value; // 2*3
        document.getElementById("y").innerHTML = PARSER.parse(x); // 6
    }
});
