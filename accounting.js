document.addEventListener("DOMContentLoaded", () => {
    const transactionList = document.getElementById("transaction-list");
    const totalRevenue = document.getElementById("total-revenue");
    const totalExpenses = document.getElementById("total-expenses");
    const netProfit = document.getElementById("net-profit");
    const transactionCount = document.getElementById("transaction-count");

    let transactions = []; // This will store your transactions

    // Function to update the financial summary
    function updateSummary() {
        let revenue = 0;
        let expenses = 0;

        transactions.forEach(transaction => {
            if (transaction.type === 'income') {
                revenue += transaction.amount;
            } else {
                expenses += transaction.amount;
            }
        });

        totalRevenue.innerText = `$${revenue.toFixed(2)}`;
        totalExpenses.innerText = `$${expenses.toFixed(2)}`;
        netProfit.innerText = `$${(revenue - expenses).toFixed(2)}`;
        transactionCount.innerText = transactions.length;
    }

    // Function to render transactions
    function renderTransactions() {
        transactionList.innerHTML = ''; // Clear existing transactions

        transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.innerText = `${transaction.description}: $${transaction.amount} (${transaction.type})`;
            transactionList.appendChild(li);
        });

        updateSummary(); // Update the summary after rendering transactions
    }

    // Save transaction button event
    document.getElementById("saveTransactionBtn").addEventListener("click", () => {
        const description = document.getElementById("transaction-description").value;
        const amount = parseFloat(document.getElementById("transaction-amount").value);
        const type = document.getElementById("transaction-type").value;

        if (description && !isNaN(amount)) {
            const newTransaction = {
                id: transactions.length + 1,
                description,
                amount,
                type
            };

            transactions.push(newTransaction);
            renderTransactions();

            // Clear form
            document.getElementById("transaction-description").value = '';
            document.getElementById("transaction-amount").value = '';
        }
    });

    // Cancel button event
    document.getElementById("cancelTransactionBtn").addEventListener("click", () => {
        document.getElementById("transaction-description").value = '';
        document.getElementById("transaction-amount").value = '';
    });
});
