class Bank {

    createAccount() {
        let person_name = name_user.value;
        let account_number = acno.value;
        console.log(acno.value);
        let balance = bal.value;
        let password = pwd.value;
        let user = {
            person_name, account_number, balance, password
        }
        localStorage.setItem(account_number, JSON.stringify(user));
        alert("account created successfully")
        location.href = "index.html"
    }

    validateAccountNumber(acno) {
        return acno in localStorage ? true : false
    }

    authenticate() {
        let account_number = acno_num.value;
        console.log(acno.value);
        let password = pass_word.value;
        console.log(password);
        if (account_number in localStorage) {
            let user = JSON.parse(localStorage.getItem(account_number))
            if (user.password == password) {
                alert("login success")
                sessionStorage.setItem(account_number, JSON.stringify(user))
                location.href = "userhome.html"
            }
            else {
                alert("invalid credentials")
            }
        }
        else {
            alert("invalid account number")
        }

    }

    logout() {
        sessionStorage.clear()
        alert("Successfully logged out")
    }

    balanceEnquiry() {
        let pass_sec = pswd.value;
        let user = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)))
        if (pass_sec == user.password) {
            acc_balance.innerHTML = `Your account balance is ${user.balance} ₹`
        }
        else {
            alert("invalid credentials")
        }

    }
    fundTransfer() {
        let to_acnum = to_acno.value;
        let amount = amt.value;
        let pass = pwd.value;
        let user = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)))
        console.log(user.balance);
        if (to_acnum in localStorage) {
            if (pass == user.password) {
                if (user.balance >= Number(amount)) {
                    let user1 = JSON.parse(localStorage.getItem(to_acnum))
                    let user2 = JSON.parse(localStorage.getItem(user.account_number))
                    let bal = Number(user1.balance) + Number(amount)
                    user1.balance = bal
                    user2.balance -= amount
                    localStorage.setItem(user1.account_number, JSON.stringify(user1))
                    localStorage.setItem(user2.account_number, JSON.stringify(user2))
                    user.balance -= amount
                    sessionStorage.setItem(user.account_number, JSON.stringify(user))
                    alert("Fund Transfer Successful")
                }
                else {
                    alert("Insufficient balance")
                }
            }
            else {
                alert("invalid credentials")
            }

        }
        else {
            alert("invalid Account number")
        }
    }
}

var bank = new Bank();



