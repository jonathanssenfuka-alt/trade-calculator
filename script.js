function calculate() {
    const entry = parseFloat(document.getElementById("entry").value);
    const stop = parseFloat(document.getElementById("stop").value);
    const tp = parseFloat(document.getElementById("tp").value);
    const lot = parseFloat(document.getElementById("lot").value);
    const balance = parseFloat(document.getElementById("balance").value);
    const side = document.getElementById("side").value;
    const symbol = document.getElementById("symbol").value;

    // VALIDATION
    if (!symbol || !entry || !stop || !tp || !lot || !balance) {
        document.getElementById("output").innerText = "Please fill all fields correctly!";
        return;
    }

    // Side validation
    if ((side === "buy" && stop >= entry) || (side === "sell" && stop <= entry)) {
        document.getElementById("output").innerText = "Stop Loss invalid for the selected side!";
        return;
    }
    if ((side === "buy" && tp <= entry) || (side === "sell" && tp >= entry)) {
        document.getElementById("output").innerText = "Take Profit invalid for the selected side!";
        return;
    }

    // Risk/Reward %
    let riskPercent = Math.abs((entry - stop) / entry) * 100;
    let rewardPercent = Math.abs((tp - entry) / entry) * 100;
    let rr = (rewardPercent / riskPercent).toFixed(2);

    // Amounts risked / reward
    let positionSize = lot * 100000; // standard
    let riskAmount = (Math.abs(entry - stop) / entry) * positionSize;
    let rewardAmount = (Math.abs(tp - entry) / entry) * positionSize;

    // Comment based on risk %
    let comment = "";
    if (riskPercent < 1) comment = "Low Risk ✅";
    else if (riskPercent <= 3) comment = "Medium Risk ⚠️";
    else comment = "High Risk 🔥";

    // OUTPUT
    document.getElementById("output").innerText = `
Side: ${side.toUpperCase()}
Symbol: ${symbol}

Risk: ${riskPercent.toFixed(2)}% (~${riskAmount.toFixed(2)} units)
Reward: ${rewardPercent.toFixed(2)}% (~${rewardAmount.toFixed(2)} units)
R:R = ${rr}
Comment: ${comment}
`;

    // Show Save Button
    document.getElementById("saveBtn").style.display = "block";
}

function saveTrade() {
    const trade = {
        symbol: document.getElementById("symbol").value,
        side: document.getElementById("side").value,
        entry: document.getElementById("entry").value,
        stop: document.getElementById("stop").value,
        tp: document.getElementById("tp").value,
        riskPercent: document.getElementById("output").innerText.match(/Risk: ([\d\.]+)/)[1]
    };

    localStorage.setItem("lastTrade", JSON.stringify(trade));
    console.log("Trade saved:", trade);
}


function loadTrades() {
    let trades = JSON.parse(localStorage.getItem("trades")) || [];
    let container = document.getElementById("tradesContainer");

    // If container doesn't exist, stop (prevents errors on calculator page)
    if (!container) return;

    container.innerHTML = ""; // clear before loading

    trades.forEach(trade => {
        let tradeDiv = document.createElement("div");

        tradeDiv.innerHTML = `
            <p>
                ${trade.pair} | Entry: ${trade.entry} | SL: ${trade.stopLoss} | TP: ${trade.takeProfit} | Risk: ${trade.risk}
            </p>
        `;

        container.appendChild(tradeDiv);
    });
}

loadTrades();
