const loginService = require('../service/loginService');


exports.login = async (req, res) => {
    try {
        const { rollno, password } = req.body;
        const user = await loginService.userLogin(rollno, password);
        if (user) {
            res.json({ status: true, message: "Login successful" });
        } else {
            res.status(401).json({ status: false, message: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: "Server error" });
    }
};